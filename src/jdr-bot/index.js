import kebabCase from 'lodash.kebabcase'
import { utils } from 'moiki-exporter'
const { getHeader, getAuthor } = '../utils'

const convertId = id => id.replace(/-/gi, '_')
const cleanContent = content => (
  content
    .replace(/<\/p>/gi, '</p> ')
    .replace(/(<([/p]+)>)/gi, '')
    .replace(/(<([/]*)(strong|b)>)/gi, "**")
    .replace(/(<([/]*)(em)>)/gi, '_')
    .replace(/(<([/]*)(span)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/(<br(\s)*(\/)*>)/gi, '+n+')
    .replace(/(&nbsp;)+/gi, ' ')
    .trim()
)

export const convertToJdrBot = (story) => {
  const { _id, meta, firstSequence, sequences, assets, sounds } = story

  const getSequenceByIndex = (id) => (sequences.findIndex(s => s.id === id) + 1)
  const getSequenceById = (id) => sequences.find(s => s.id === id)

  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = {
      storyVar: convertId(kebabCase(asset.label)),
      ...asset
    }
  }

  const rooms = []
  const specialRooms = []
  let nextSpecialRoomId = sequences.length + 1

  for (let sequence of sequences) {
    let thisRoom = ''
    const text = cleanContent(sequence.content)
    thisRoom += getSequenceByIndex(sequence.id) + ' ' + sequence.id + '\n'
    if (sequence.soundLoop && sequence.soundLoop.sound) {
      const snd = sounds.find(s => s.id === sequence.soundLoop.sound)
      if (snd && snd.sound && snd.sound.previews && snd.sound.previews['preview-lq-mp3'])
      thisRoom += '<<' + snd.sound.previews['preview-lq-mp3'] + '>>'
    }
    if (sequence.id === firstSequence) {
      if (meta.image) {
        thisRoom += `[[${meta.image}]]+n+&&\nCrédit photo : Unsplash+n+&&\n`
      }
      thisRoom += `Une histoire de ${getAuthor(meta).trim()}+n++n+&&\n`
      thisRoom += `${meta.description}+n++n+&&\n`
    }
    thisRoom += '[[' + text.split('\n').map(x => `${x}+n+`).join('') + ']]'

    if (sequence.choices && sequence.choices.length > 0) {
      const nextRooms = []
      for (let choice of sequence.choices) {
        if (choice.condition && choice.condition.next && choice.condition.params) {
          specialRooms.push({
            id: nextSpecialRoomId,
            events: [
              `997|${variables[choice.condition.params].storyVar}|${getSequenceByIndex(choice.condition.next)}|null\n`,
              `997|null|${getSequenceByIndex(choice.next)}|null\n`
            ]
          })
          thisRoom += `+n+&&\n${cleanContent(choice.content)} (${nextSpecialRoomId})`
          nextRooms.push(nextSpecialRoomId)
          ++nextSpecialRoomId
        } else {
          const nextId = getSequenceByIndex(choice.next)
          if (choice.action && choice.action.params && typeof choice.action.params === 'string') {
            const action = variables[choice.condition.params]
            specialRooms.push({
              id: nextSpecialRoomId,
              //content: '[[[](' + action.icon + ')]]',
              action: `${action.storyVar}|invisible|null|${action.desc.trim()}|null`,
              events: [`997|null|${nextId}|null\n`]
            })
            thisRoom += `+n+&&\n${cleanContent(choice.content)} (${nextSpecialRoomId})`
            nextRooms.push(nextSpecialRoomId)
            ++nextSpecialRoomId
          } else {
            thisRoom += `+n+&&\n${cleanContent(choice.content)} (${nextId})`
            nextRooms.push(nextId)
          }
        }
      }
      if (nextRooms.length > 0) {
        thisRoom += '\n|\n'
        for (let next of nextRooms) {
          thisRoom += next + '\n'
        }
      }
    } else if (sequence.final || !sequence.next) {
      thisRoom += '\n|\n'
      if (sequence.final && sequence.isHappyEnd) {
        thisRoom += '999|Tu as gagné ! Bravo !\n'
      } else {
        thisRoom += '998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n'
      }  
    } else {
      thisRoom += '\n|\n'
      if (sequence.action && sequence.action.params && typeof sequence.action.params === 'string') {
        const action = variables[sequence.action.params]
        specialRooms.push({
          id: nextSpecialRoomId,
          //content: '[[[](' + action.icon + ')]]',
          action: `${action.storyVar}|invisible|null|${action.desc.trim()}|null`,
          events: [`997|null|${getSequenceByIndex(sequence.next)}|null\n`]
        })
        thisRoom += `997|null|${nextSpecialRoomId}|null\n`
        ++nextSpecialRoomId
      } else {
        if (sequence.condition) {
          thisRoom += `997|${variables[sequence.condition.params].storyVar}|${getSequenceByIndex(sequence.condition.next)}|null\n`
        }
        thisRoom += `997|null|${getSequenceByIndex(sequence.next)}|null\n`
      }
    }
    thisRoom += '*****'
    rooms.push({id: sequence.id, room: thisRoom})
  }

  for (let {id, events, action, content='null'} of specialRooms) {
    let room = id + ' special-room-' + id + '\n'
    room += content + '\n'
    room += action ? action : '|'
    room += '\n' + events.join('')
    room += '*****'
    rooms.push({id, room})
  }

  return meta.name + '\n' + rooms.length + '\n' + rooms.map(({room}) => room).join('\n')
}