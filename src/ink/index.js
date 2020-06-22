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
    .replace(/&nbsp;/gi, ' ')
    .replace(/(\s)+/gi, ' ')
    .trim()
}

const addCondition = (data, variables) => (
`{ ${variables[data.condition.params].inkVar}:
  -> ${convertId(data.condition.next)}
- else:
  -> ${convertId(data.next)}
}
`)

const addAction = (data, variables, prefix='') => {
  const {inkVar, desc} = variables[data.action.params]
  return (`
${prefix}~ ${inkVar} = !${inkVar}
${prefix}{ ${inkVar}:
${prefix}  <h4><em>Objet récupéré</em> : ${desc}</h4>
${prefix}- else:
${prefix}  <h4><em>Objet perdu</em> : ${desc}</h4>
${prefix}}
`)}

export const convertToInk = (story) => {
  const { _id, meta, firstSequence, sequences, assets } = story

  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = {
      inkVar: '_' + convertId(kebabCase(asset.label)),
      ...asset
    }
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

  const varsAsArray = Object.entries(variables).map(([_, data]) => data)
  for (let variable of varsAsArray) {
    result += 'VAR ' + variable.inkVar + ' = false\n'
  }
  result += '\n-> ' + convertId(firstSequence) + '\n'

  for (let sequence of sequences) {
    const text = cleanContent(sequence.content)
    result += '\n=== ' + convertId(sequence.id) + ' ===\n'
    result += text + '\n'
    if (sequence.choices && sequence.choices.length > 0) {
      for (let choice of sequence.choices) {
        let action = ' '
        if (choice.action && choice.action.params && typeof choice.action.params === 'string') {
          action = addAction(choice, variables, '\t')
        }
        let choiceContent = '* [' + cleanContent(choice.content) + ']' + action
        if (choice.condition && choice.condition.next && choice.condition.params) {
          result += `${choiceContent} ${addCondition(choice, variables)}`
        } else {
          result += choiceContent + '-> ' + convertId(choice.next) + '\n'
        }
      }
      result += '# CLEAR\n'
    } else {
      if (sequence.action && sequence.action.params && typeof sequence.action.params === 'string') {
        result += addAction(sequence, variables)
      }
      if (sequence.condition && sequence.condition.next && sequence.condition.params) {
        result += addCondition(sequence, variables)
      } else if (sequence.next) {
        result += '-> ' + convertId(sequence.next) + '\n'
      } else {
        result += '-> END\n'
      }
    }
  }
  return result
}