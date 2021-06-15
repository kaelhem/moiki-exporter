import kebabCase from 'lodash.kebabcase'
import { parseHTML } from 'twine-parser'
import { harloweHelper, sugarcubeHelper } from './twine-formats'

const extractVars = (str) => {
  return str.match(/\([s|S]et:\s*\$([a-zA-Z0-9_.]+)\sto\s(.+)\)/gim)
}

const extractConditions = (str) => {
  return str.match(/\([i|I]f:\s*(.+)\)/gim)
}

const cleanText = (txt) => {
  let cleaned = txt
    .replace(/<<audio([^>]+)>>/gim, '')
    .replace(/<<textbox([^>]+)>>/gim, '')
    .replace(/<img([^>]+)>/gim, '')
    .replace(/<<button([^<]+)<<\/button>>/gim, '')
    .replace(/<<set([^>]+)>>/gim, '')
    .replace(/\[\[([^\]]+)\]\]/gim, '')
    .replace(/\([s|S]et:\s*\$([a-zA-Z0-9_.]+)\sto\s(.+)\)/gim, '') // remove "set" vars
    .replace(/\([i|I]f:\s*(.+)\)/gim, '') // remove "if" conditions
    .replace(/\n\n/gim, '\n')
    .trim()
    
  const styles = cleaned.match(/@@([^@]+)@@/gim)
  if (styles) {
    styles.forEach(style => {
      const textOnly = style.split(';').reverse()[0]
      cleaned = cleaned.replace(style, textOnly.split('@@')[0])
    })
  }
  return cleaned
}

const getStoryFormat = (content) => {
  const storyFormat = { format: null, version: null }
  const storyTag = /<tw-storydata(.+?)>/.exec(content)
  const strStoryTag = storyTag && storyTag.length > 1 ? storyTag[1] : null
  const formatAttr = /format="(.+?)"/.exec(strStoryTag)
  const versionAttr = /format-version="(.+?)"/.exec(strStoryTag)
  if (formatAttr && formatAttr.length > 0) {
    storyFormat.format = formatAttr[1]
  }
  if (versionAttr && versionAttr.length > 0) {
    storyFormat.version = versionAttr[1]
  }
  return storyFormat
}

const convertTwineStatement = (statement, storyFormat) => {
  const format = storyFormat.format ? storyFormat.format.toLowerCase() : null
  switch (format) {
    case 'harlowe': return harloweHelper.convertStatement(statement)
    case 'sugarcube': return sugarcubeHelper.convertStatement(statement)
    default: return {
      raw: statement,
      kind: 'text',
      data: {}
    }
  }
}

const convertPassageToSequence = (passage, storyFormat) => {
  const {name, text} = passage
  const statements = text.split('\n')
  const content = []
  const links = []
  const vars = []
  const convertedStatements = []
  const errors = []
  for (let statement of statements) {
    const convertedStatement = convertTwineStatement(statement, storyFormat)
    convertedStatements.push(convertedStatement)
    const { kind, raw, data } = convertedStatement
    switch (kind) {
      case 'text': content.push(raw); break
      case 'link': links.push(data); break
      case 'vars': vars.push(data); break
      default: {
        errors.push({message: 'Don\'t know what to do with this statement: ' + raw, statement, passage})
      }
    }
  }
  return {
    id: kebabCase(name),
    content: content.join('\n'),
    convertedStatements,
    vars,
    choices: links && links.length > 0 ? links.map(l => ({
      content: cleanText(l.content),
      next: kebabCase(l.next),
      showCondition: l.condition ? {
        kind: 'counter',
        query: {
          params: [{
            target: '',
            condition: '',
            value: 0
          }]
        }
      } : null
    })) : []
  }
  return {
    id: kebabCase(name),
    twineVars: extractVars(text),
    twineConditions: extractConditions(text),
    content: cleanText(text),
    choices: links && links.length > 0 ? links.map(l => ({
      content: cleanText(l.text),
      next: kebabCase(l.destination.name)
    })) : []
  }
}

export async function handler(event, data) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'This was not a POST request!'})
    }
  }
  const jsonBody = JSON.parse(event.body)
  if (!jsonBody && !jsonBody.content) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'Body was empty.'})
    }
  }
  const regexp = new RegExp('startnode\=\"([^\"]+)\"', 'gmi')
  const extracter = regexp.exec(jsonBody.content)
  const startNode = extracter && extracter.length > 1 ? extracter[1] : null

  const storyFormat = getStoryFormat(jsonBody.content)

  try {
    const twine = parseHTML(jsonBody.content)
    const excludedPassages = [
      'StoryAuthor',
      'StorySubtitle',
      'StoryInit'
    ]
    const passages = twine.passages.filter(x => excludedPassages.indexOf(x.name) === -1)
    const title = twine.passages.filter(x => x.name === 'StorySubtitle').map(x => x.text)
    const extractStartSequenceIds = startNode ? twine.passages.filter(x => x.pid.toString() === startNode).map(x => kebabCase(x.name)) : null
    const startSequence = extractStartSequenceIds && extractStartSequenceIds.length > 0 ? extractStartSequenceIds[0] : null
    const moikiStory = {
      meta: {
        name: jsonBody.name || 'Twine import',
        description: title && title.length > 0 ? title[0] : 'My twine story'
      },
      assets: [],
      sounds: []
    }
    moikiStory.sequences = passages.map(p => convertPassageToSequence(p, storyFormat))
    return {
      statusCode: 200,
      body: JSON.stringify(moikiStory.sequences)//{...moikiStory, firstSequence: startSequence || moikiStory.sequences[0].id})
    }
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'not a twine file!\n' + e.message })
    }
  }
}