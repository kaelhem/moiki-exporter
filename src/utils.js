const getDate = () => {
  const dateOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  return new Date().toLocaleDateString('en-US', dateOptions)
}

export const getHeader = (storyId) => (
`This story was created with Moiki, and converted with Moiki-Exporter
More info: https://github.com/kaelhem/moiki-exporter
Launch it with the Moiki player: https://moiki.fr/story/${storyId}
Exported on ${getDate()}`
)

export const getAuthor = (story) => {
  if (story && story.author) {
    const { firstname, lastname, pseudo } = story.author
    return pseudo ? pseudo : firstname + ' ' + lastname
  }
  return 'Inconnu'
}

/*
  This WTF function allow to chain simple sequences as it was one.
  It returns an array of sequences with this added attributes :
    * chain: array of chained sequences (this one included)
    * chainedContent: an array with either : 
      + cumulated text of the chained sequences (as strings)
      + object that corresponding to won objects
      ex.: ['text of several sequences', {pngIcon, desc}, 'text of following sequences']
*/
export const simplifyStory = ({sequences, firstSequence, assets}, vars, cleanTextFn) => {
  const tree = {}

  const addLink = (id, to, isBackLink=false) => {
    if (!tree[id]) {
      tree[id] = {in: [], to: []}
    }
    if (!isBackLink) {
      tree[id].to.push(to)
      addLink(to, id, true)
    } else {
      tree[id].in.push(to)
    }
  }

  const allSequencesById = {}

  for (let s of sequences) {
    allSequencesById[s.id] = s
    if (s.choices && s.choices.length > 0) {
      for (let choice of s.choices) {
        choice.content = cleanTextFn(choice.content)
        if (choice.condition && choice.condition.next && choice.condition.params) {
          addLink(s.id, choice.condition.next)
        }
        if (choice.next) {
          addLink(s.id, choice.next)
        }
      }
    } else {
      if (s.condition && s.condition.next && s.condition.params) {
        addLink(s.id, s.condition.next)
      }
      if (s.next) {
        addLink(s.id, s.next)
      }
    }
  }
  
  const chapters = [allSequencesById[firstSequence]]
  const treeArray = Object.entries(tree).map(([index, data]) => ({data, index}))
  for (let node of treeArray) {
    if ((node.data.in.length > 1 || (node.data.in.length === 1 && tree[node.data.in[0]].to.length > 1)) && node.index !== firstSequence) {
      chapters.push(allSequencesById[node.index])
    }
  }
  for (let chap of chapters) {
    let currentId = chap.id
    const chain = [allSequencesById[currentId]]
    while (tree[currentId].to.length === 1) {
      currentId = tree[currentId].to[0]
      chain.push(allSequencesById[currentId])
    }
    chap.chain = chain

    const chainWithObjects = []
    for (let node of chain) {
      chainWithObjects.push(node)
      if (node.action && node.action.params && typeof node.action.params === 'string') {
        chainWithObjects.push({objectAction: vars[node.action.params]})
      }
    }
    const chainSum = []
    let contentSum = ''
    for (let chainObj of chainWithObjects) {
      if (chainObj.objectAction) {
        if (contentSum) {
          chainSum.push(contentSum.replace(/(\s)*<br(\s)*\/>(\s)*/gi, '\u000D\u000A'))
          contentSum = ''
        }
        chainSum.push(chainObj.objectAction)
      } else {
        contentSum += cleanTextFn(chainObj.content) + ' '
      }
    }
    if (contentSum) {
      chainSum.push(contentSum.replace(/(\s)*<br(\s)*\/>(\s)*/gi, '\u000D\u000A'))
    }
    chap.chainedContent = chainSum
  }
  return chapters
}