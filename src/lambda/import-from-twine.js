import kebabCase from 'lodash.kebabcase'
import { parseHTML } from 'twine-parser'

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

const convertPassageToSequence = (passage) => {
  const {name, text, links} = passage
  return {
    id: kebabCase(name),
    content: text.split('\n'),
    links
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
    moikiStory.sequences = passages.map(convertPassageToSequence)
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