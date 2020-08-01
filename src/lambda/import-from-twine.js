import kebabCase from 'lodash.kebabcase'
import { parseHTML } from 'twine-parser'

const cleanText = (txt) => {
  let cleaned = txt
    .replace(/<<audio([^>]+)>>/gim, '')
    .replace(/<<textbox([^>]+)>>/gim, '')
    .replace(/<img([^>]+)>/gim, '')
    .replace(/<<button([^<]+)<<\/button>>/gim, '')
    .replace(/<<set([^>]+)>>/gim, '')
    .replace(/\[\[([^\]]+)\]\]/gim, '')
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
  try {
    const twine = parseHTML(jsonBody.content)
    const excludedPassages = [
      'StoryAuthor',
      'StorySubtitle',
      'StoryInit'
    ]
    const passages = twine.passages.filter(x => excludedPassages.indexOf(x.name) === -1)
    const title = twine.passages.filter(x => x.name === 'StorySubtitle').map(x => x.text)
    const moikiStory = {
      meta: {
        name: jsonBody.name || 'Twine import',
        description: title && title.length > 0 ? title[0] : 'My twine story'
      },
      assets: [],
      sounds: []
    }
    moikiStory.sequences = passages.map(x => ({
      id: kebabCase(x.name),
      content: cleanText(x.text),
      choices: x.links && x.links.length > 0 ? x.links.map(l => ({
        content: cleanText(l.text),
        next: kebabCase(l.destination.name)
      })) : []
    }))
    return {
      statusCode: 200,
      body: JSON.stringify({...moikiStory, firstSequence: moikiStory.sequences[0].id})
    }
  } catch(e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: 'not a twine file!\n' + e.message })
    }
  }
}