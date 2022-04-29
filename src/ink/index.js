import kebabCase from 'lodash.kebabcase'
import { getHeader, getAuthor } from '../utils'

const convertId = id => id.replace(/-/gi, '_')
const cleanContent = content => {
  return content
    .replace(/(<(strong|b)>\s)/gi, ' <b>')
    .replace(/(\s<\/(strong|b)>)/gi, '</b> ')
    .replace(/(<em>\s)/gi, ' <em>')
    .replace(/(\s<\/em>)/gi, '</em> ')
    .replace(/<\/p>/gi, '</p> ')
    .replace(/(<([/p]+)>)/gi, '')
    .replace(/(<([/]*)(span)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/(\s)+/gi, ' ')
    .trim()
}

const INDENT = '  '

export const convertToInk = (story) => {
  const { _id, meta, firstSequence, sequences, assets, counters } = story

  let objectVariables = {}
  for (let asset of assets) {
    objectVariables[asset.id] = {
      inkVar: '_object_' + convertId(kebabCase(asset.label)),
      ...asset
    }
  }

  let counterVariables = {}
  for (let counter of counters) {
    counterVariables[counter.id] = {
      inkVar: '_counter_' + convertId(kebabCase(counter.name)),
      ...counter
    }
  }

  const convertObjectCondition = (condition, target) => {
    const {inkVar} = objectVariables[target]
    switch (condition) {
      case 'with': return inkVar
      case 'without': return `not ${inkVar}`
      default: console.warn('This type of object condition is unknown:', condition)
    }
    return null
  }

  const convertCounterCondition = (condition, target, value) => {
    const {inkVar} = counterVariables[target]
    if (isNaN(value) || typeof value !== 'number') {
      console.warn('The value of this counter condition is invalid:', value)
      return null
    }
    switch (condition) {
      case '=': {
        return `${inkVar} == ${value}`
      }
      case '!=': case '<': case '<=': case '>': case '>=': {
        return `${inkVar} ${condition} ${value}`
      }
      default: console.warn('This type of counter condition is unknown:', condition)
    }
    return null
  }

  const convertPassageCondition = (condition, target) => {
    switch (condition) {
      case 'by': return `${convertId(target)}`
      case 'not-by': return `not ${convertId(target)}`
      default: console.warn('This type of passage condition is unknown:', condition)
    }
    return null
  }

  const convertMultipleCondition = (allConditions) => {
    const res = []
    for (let c of allConditions) {
      const {kind, condition, target, value} = c
      res.push(convertCondition(kind, [{condition, target, value}]))
    }
    return res.filter(x => x !== null)
  }

  const convertCondition = (kind, params, operator) => {
    const [{condition, target, value}] = params
    switch (kind) {
      case 'object': return convertObjectCondition(condition, target)
      case 'counter': return convertCounterCondition(condition, target, value)
      case 'passage': return convertPassageCondition(condition, target)
      case 'multiple': {
        const multiCond = convertMultipleCondition(params)
        return multiCond && multiCond.length > 0 ? multiCond.join(operator === 'and' ? ' && ' : ' || ') : null
      }
      default: {
        console.warn('This kind of condition is unknown:', kind)
      }
    }
  }

  const addConditions = (conditions, defaultNext, newLine=false) => {
    const inkConditions = conditions.map(c => {
      const {kind, next, query: {params, operator=null}} = c
      const cond = convertCondition(kind, params, operator)
      return {cond, next}
    })
    let strConditions = null
    if (inkConditions && inkConditions.length > 0) {
      strConditions = [...inkConditions, {cond: 'else', next: defaultNext}]
        .map(({cond, next}) => `- ${cond}:\n${INDENT}-> ${convertId(next)}`)
        .join('\n')
        .replace(/\n/g, `\n${INDENT}`)
    }
    const lf = newLine ? '\n' : ''
    return strConditions ? `${lf}{\n${INDENT}${strConditions}\n}\n` : `-> ${convertId(defaultNext)} \n`
  }

  const convertObjectAction = ({target, modifier}) => {
    const {inkVar, label, desc} = objectVariables[target]
    switch (modifier) {
      case 'toggle': {
        return [
          `~ ${inkVar} = !${inkVar}`,
          `{ ${inkVar}:`,
          `${INDENT}<em>Objet récupéré : ${label} - "${desc}"</em>`,
          `- else:`,
          `${INDENT}<em>Objet perdu : ${label} - "${desc}"</em>`,
          `}`
        ]
      }
      case 'add': {
        return [
          `{ not ${inkVar}:`,
          `${INDENT}~ ${inkVar} = true`,
          `${INDENT}<em>Objet récupéré : ${label} - "${desc}"</em>`,
          `}`
        ]
      }
      case 'sub': {
        return [
          `{ ${inkVar}:`,
          `${INDENT}~ ${inkVar} = false`,
          `${INDENT}<em>Objet perdu : ${label} - "${desc}"</em>`,
          `}`
        ]
      }
      default: console.warn('This action modifier is unknown:', modifier)
    }
    return null
  }

  const convertCounterAction = ({target, modifier, value}) => {
    const {inkVar, name, gauge} = counterVariables[target]
    switch (modifier) {
      case 'set': {
        const defaultAction = [`~ ${inkVar} = ${value}`]
        return gauge ? [
          ...defaultAction,
          `<em>${name} vaut maintenant : ${value}</em>`
        ] : defaultAction
      }
      case 'add': {
        const defaultAction = [`~ ${inkVar} += ${value}`]
        return gauge ? [
          ...defaultAction,
          `<em>${name} augmente de ${value} et vaut maintenant : {${inkVar}}</em>`
        ] : defaultAction
      }
      case 'sub': {
        const defaultAction = [`~ ${inkVar} -= ${value}`]
        return gauge ? [
          ...defaultAction,
          `<em>${name} diminue de ${value} et vaut maintenant : {${inkVar}}</em>`
        ] : defaultAction
      }
      default: console.warn('This action modifier is unknown:', modifier)
    }
    return null
  }

  const convertAction = ({kind, params}) => {
    switch (kind) {
      case 'object': return convertObjectAction(params)
      case 'counter': return convertCounterAction(params)
      default: {
        console.warn('This kind of action is unknown:', kind)
      }
    }
  }

  const addActions = (actions) => {
    const listActions = []
    for (let act of actions) {
      const action = convertAction(act)
      action && listActions.push(action.join('\n'))
    }
    if (listActions && listActions.length > 0) {
      return listActions.join('\n') + '\n'
    }
    return null
  }
  
  let result = `/*
${getHeader(_id)}
*/

# author: ${getAuthor(meta)}
# title: ${meta.name}
`
  if (meta.image) {
    result += `# IMAGE: ${meta.image.replace(/\//gi, '\\/')}
<em>Crédit photo : <a href="${'https://unsplash.com'.replace(/\//gi, '\\/')}">Unsplash</a></em>
`
  }
  result += '<em>' + meta.description + '</em>\n<hr/>\n'

  const objectVarsAsArray = Object.entries(objectVariables).map(([_, data]) => data)
  for (let {inkVar} of objectVarsAsArray) {
    result += 'VAR ' + inkVar + ' = false\n'
  }
  const counterVarsAsArray = Object.entries(counterVariables).map(([_, data]) => data)
  for (let {inkVar, defaultValue=0} of counterVarsAsArray) {
    result += `VAR ${inkVar} = ${defaultValue}\n`
  }

  result += '\n-> ' + convertId(firstSequence) + '\n'

  for (let sequence of sequences) {
    const text = cleanContent(sequence.content)
    result += '\n=== ' + convertId(sequence.id) + ' ===\n'
    result += text + '\n'
    if (sequence.puzzle) {
      // TODO !
    } else if (sequence.choices && sequence.choices.length > 0) {
      for (let choice of sequence.choices) {
        let actions = ' '
        if (choice.actions && choice.actions.length > 0) {
          actions = addActions(choice.actions)
        }
        let prefix = '+ '
        if (choice.showCondition && choice.showCondition.kind) {
          const {kind, query: {params, operator=null}} = choice.showCondition
          prefix += '{' + convertCondition(kind, params, operator) + '} '
        }
        let choiceContent = prefix + '[' + cleanContent(choice.content) + ']' + actions
        if (choice.conditions && choice.conditions.length > 0) {
          result += `${choiceContent} ${addConditions(choice.conditions, choice.next, true)}`
        } else {
          result += choiceContent + '-> ' + convertId(choice.next) + '\n'
        }
      }
      result += '# CLEAR\n'
    } else {
      if (sequence.actions && sequence.actions.length > 0) {
        result += addActions(sequence.actions)
      }
      if (sequence.conditions && sequence.conditions.length > 0) {
        result += addConditions(sequence.conditions, sequence.next)
      } else if (sequence.next) {
        result += '-> ' + convertId(sequence.next) + '\n'
      } else {
        result += '-> END\n'
      }
    }
  }
  return result
}
