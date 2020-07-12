import kebabCase from 'lodash.kebabcase'
import { getAuthor } from '../utils'

const convertId = id => id.replace(/-/gi, '_')
const cleanContent = content => (
  content
    .replace(/<\/p>/gi, '</p> ')
    .replace(/(<([/p]+)>)/gi, '')
    .replace(/(<(strong|b)>\s)/gi, ' <b>')
    .replace(/(\s<\/(strong|b)>)/gi, '</b> ')
    .replace(/(<([/]*)(strong|b)>)/gi, "**")
    .replace(/(<em>\s)/gi, ' <em>')
    .replace(/(\s<\/em>)/gi, '</em> ')
    .replace(/(<([/]*)(em)>)/gi, '_')
    .replace(/(<([/]*)(span)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/(<br(\s)*(\/)*>)/gi, '+n+')
    .replace(/(&nbsp;)+/gi, ' ')
    .replace(/(\s)+/gi, ' ')
    .trim()
)

export const convertToJdrBot = (story) => {
  const { meta, firstSequence, sequences, assets, sounds } = story

  const getSequenceByIndex = (id) => (sequences.findIndex(s => s.id === id) + 2)

  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = {
      storyVar: convertId(kebabCase(asset.label)),
      ...asset
    }
  }

  const rooms = []
  const specialRooms = []
  let nextSpecialRoomId = sequences.length + 2

  const addObjectRoom = (object, nextId) => {
    const objectRoomId = nextSpecialRoomId
    // condition to check if object should be win / lose
    specialRooms.push({
      id: objectRoomId,
      events: [
        `997|${object.storyVar}|${objectRoomId + 2}|null\n`, // object should be lose
        `997|null|${objectRoomId + 1}|null\n` // object should be win
      ]
    })
    // win object
    specialRooms.push({
      id: objectRoomId + 1,
      action: `${object.storyVar}|invisible|null|récupéré: ${object.desc.trim()}|null`,
      events: [`997|null|${nextId}|null\n`]
    })
    // lose object
    specialRooms.push({
      id: objectRoomId + 2,
      action: `-${object.storyVar}|invisible|null|perdu: ${object.desc.trim()}|null`,
      events: [`997|null|${nextId}|null\n`]
    })
    nextSpecialRoomId += 3
    return objectRoomId
  }

  /* Manage story header */
  let headRoom = '1 _start_\n'
  if (meta.image) {
    headRoom += `[[${meta.image}]]+n+&&\nCrédit photo : Unsplash+n+&&\n`
  }
  headRoom += `Une histoire de ${getAuthor(meta).trim()}+n+&&\n`
  headRoom += `(exporté via https://moiki.fr)+n++n+&&\n`
  headRoom += `${meta.description}\n|\n`
  headRoom += `997|null|${getSequenceByIndex(firstSequence)}|null\n`
  headRoom += `*****`
  rooms.push({id: '$start', room: headRoom})

  /* Convert sequences */
  for (let sequence of sequences) {
    let thisRoom = ''
    const text = cleanContent(sequence.content)
    thisRoom += getSequenceByIndex(sequence.id) + ' ' + sequence.id + '\n'
    /*
    // sound are not really well managed on discord, and they could be annoying... so skipping this part.
    if (sequence.soundLoop && sequence.soundLoop.sound) {
      const snd = sounds.find(s => s.id === sequence.soundLoop.sound)
      if (snd && snd.sound && snd.sound.previews && snd.sound.previews['preview-lq-mp3'])
      thisRoom += '<<' + snd.sound.previews['preview-lq-mp3'] + '>>'
    }
    */
    thisRoom += '[[' + text.split('\n').map(x => `${x}+n+`).join('') + ']]'

    if (sequence.choices && sequence.choices.length > 0) {
      /*
        This is a choice sequence
      */
      const nextRooms = []
      let index = 1
      for (let choice of sequence.choices) {
        const nextId = getSequenceByIndex(choice.next)
        if (choice.condition && choice.condition.next && choice.condition.params) {
          specialRooms.push({
            id: nextSpecialRoomId,
            events: [
              `997|${variables[choice.condition.params].storyVar}|${getSequenceByIndex(choice.condition.next)}|null\n`,
              `997|null|${nextId}|null\n`
            ]
          })
          thisRoom += `+n+&&\n${cleanContent(choice.content)} (${index})`
          nextRooms.push(nextSpecialRoomId)
          ++nextSpecialRoomId
        } else if (choice.action && choice.action.params && typeof choice.action.params === 'string') {
          const actionRoomId = addObjectRoom(variables[choice.action.params], nextId)
          thisRoom += `+n+&&\n${cleanContent(choice.content)} (${index})`
          nextRooms.push(actionRoomId)
        } else {
          thisRoom += `+n+&&\n${cleanContent(choice.content)} (${index})`
          nextRooms.push(nextId)
        }
        ++index
      }
      if (nextRooms.length > 0) {
        thisRoom += '\n|\n'
        index = 1
        for (let next of nextRooms) {
          thisRoom += index + '->' + next + '\n'
          ++index
        }
      }
    } else if (sequence.final || !sequence.next) {
      /*
        This is a final sequence
      */
      thisRoom += '\n|\n'
      if (sequence.final && sequence.isHappyEnd) {
        thisRoom += '999|Tu as gagné ! Bravo !\n'
      } else {
        thisRoom += '998|Tu as perdu ! Recommence, je suis sûr que tu peux y arriver !\n'
      }  
    } else {
      /*
        This is a simple sequence
      */
      const nextId = getSequenceByIndex(sequence.next)
      thisRoom += '\n|\n'
      if (sequence.action && sequence.action.params && typeof sequence.action.params === 'string') {
        const actionRoomId = addObjectRoom(variables[sequence.action.params], nextId)
        thisRoom += `997|null|${actionRoomId}|null\n`
      } else {
        if (sequence.condition) {
          thisRoom += `997|${variables[sequence.condition.params].storyVar}|${getSequenceByIndex(sequence.condition.next)}|null\n`
        }
        thisRoom += `997|null|${nextId}|null\n`
      }
    }
    thisRoom += '*****'
    rooms.push({id: sequence.id, room: thisRoom})
  }

  /*
    Special rooms used for conditions / objects
  */
  for (let {id, events, action} of specialRooms) {
    let room = id + ' condition-room-' + id + '\n'
    room += 'null\n'
    room += action ? action : '|'
    room += '\n' + events.join('')
    room += '*****'
    rooms.push({id, room})
  }

  return meta.name + '\n' + rooms.length + '\n' + rooms.map(({room}) => room).join('\n')
}