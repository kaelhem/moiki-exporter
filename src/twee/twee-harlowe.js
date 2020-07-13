import kebabCase from 'lodash.kebabcase'
import { v4 as uuidv4 } from 'uuid'
import { getHeader, getAuthor } from '../utils'

const convertId = id => id.replace(/-/gi, '_')
const cleanContent = content => (
  content
    .replace(/(<(strong|b|h\d)>\s)/gi, ' <b>')
    .replace(/(\s<\/(strong|b|h\d)>)/gi, '</b> ')
    .replace(/(<em>\s)/gi, ' <em>')
    .replace(/(\s<\/em>)/gi, '</em> ')
    .replace(/<\/p>/gi, '</p> ')
    .replace(/(<([/p]+)>)/gi, '')
    .replace(/(<([/]*)(strong|b|h\d)>)/gi, "''")
    .replace(/(<([/]*)(em)>)/gi, '//')
    .replace(/(<([/]*)(span)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/(<br(\s)*(\/)*>)/gi, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/(\s)+/gi, ' ')
    .trim()
)

const esc = content => content.replace(/"/gi, '\\"')

const addCondition = (data, variables, kind='goto') => (
`(if: ${variables[data.condition.params].tweeVar})[(${kind}: "${convertId(data.condition.next)}")]
(else:)[(${kind}: "${convertId(data.next)}")]
`)

const addLink = (data, variables) => {
  const condition = (data.condition && data.condition.next && data.condition.params) ? data.condition.params : null
  const actionId = (data.action && data.action.params && typeof data.action.params === 'string') ? data.action.params : null
  const next = data.next ? convertId(data.next) : null
  const content = esc(cleanContent(data.content))
  if (actionId) {
    const {tweeVar, desc} = variables[actionId]
    return `(link: "${content}")[(set: ${tweeVar} to not ${tweeVar}, $actionText to "${esc(desc)}", $actionPassage to "${next}", $isObjectWin to ${tweeVar})[(goto: "Toggle-Object")]]\n`
  } else if (condition) {
    return `(link: "${content}")[${addCondition(data, variables)}]\n`
  } else if (next) {
    return `(link: "${content}")[(goto: "${next}")]\n`
  }
  return ''
}

const addNext = (data, variables) => {
  const condition = (data.condition && data.condition.next && data.condition.params) ? data.condition.params : null
  const actionId = (data.action && data.action.params && typeof data.action.params === 'string') ? data.action.params : null
  const next = data.next ? convertId(data.next) : null
  if (actionId) {
    const {tweeVar, desc} = variables[actionId]
    return `(set: ${tweeVar} to not ${tweeVar}, $actionText to "${esc(desc)}", $actionPassage to "${next}", $isObjectWin to ${tweeVar})[(display: "Toggle-Object")]\n`
  } else if (condition) {
    return `${addCondition(data, variables, 'display')}\n`
  } else if (next) {
    return `(display: "${next}")\n`
  }
  return ''
}

export const convertToHarlowe = (story) => {
  const { _id, meta, firstSequence, sequences, assets } = story

  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = {
      tweeVar: '$' + convertId(kebabCase(asset.label)),
      ...asset
    }
  }
  
  let result = `<!--
${getHeader(_id)}
-->

:: StoryAuthor
${getAuthor(meta)}

:: StoryTitle
${meta.name}

:: StorySubtitle
${meta.description}

:: StoryData
{
  "ifid": "${uuidv4()}",
  "format": "Harlowe",
  "format-version": "3.1.0",
  "start": "${convertId(firstSequence)}",
  "zoom": 1
}

`
  const varsAsArray = Object.entries(variables).map(([_, data]) => data)
  let variablesSetup = '(set: $actionText to false, $actionPassage to false, $isObjectWin to false)\n'
  for (let variable of varsAsArray) {
    variablesSetup += '(set: ' + variable.tweeVar + ' to false)\n'
  }

  for (let sequence of sequences) {
    const text = cleanContent(sequence.content)
    result += '\n:: ' + convertId(sequence.id) + '\n' + text + '\n'
    if (sequence.choices && sequence.choices.length > 0) {
      for (let choice of sequence.choices) {
        result += addLink(choice, variables)
      }
    } else {
      result += addNext(sequence, variables)
    }
    if (sequence.id === firstSequence) {
      result += variablesSetup
    }
  }

  result += `
:: Toggle-Object
(if: $isObjectWin)[Objet récupéré : {$actionText}]
(else:)[Objet perdu : {$actionText}]
(display: $actionPassage)
`
  return result
}