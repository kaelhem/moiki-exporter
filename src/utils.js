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
      ex.: ['text of several sequences', {sequenceAction}, 'text of following sequences']

  /!\ this method is destructive for the sequences object pass in. You should use a deep copy to keep you data untouched.
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
        if (choice.conditions && choice.conditions.length > 0) {
          for (let cond of choice.conditions) {
            if (cond.next) {
              addLink(s.id, cond.next)
            }
          }
        }
        if (choice.next) {
          addLink(s.id, choice.next)
        }
      }
    } else {
      if (s.conditions && s.conditions.length > 0) {
        for (let cond of s.conditions) {
          if (cond.next) {
            addLink(s.id, cond.next)
          }
        }
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

    const chainWithActions = []
    for (let node of chain) {
      chainWithActions.push(node)
      if (node.actions && node.actions.length === 1 && node.actions[0] && node.actions[0].params) {
        chainWithActions.push({objectAction: vars[node.actions[0].params.target], kind: node.actions[0].kind})
      }
    }
    const chainSum = []
    let contentSum = ''
    for (let chainObj of chainWithActions) {
      if (chainObj.objectAction) {
        if (contentSum) {
          chainSum.push(contentSum.replace(/(\s)*<br(\s)*\/>(\s)*/gi, '\u000D\u000A').trim())
          contentSum = ''
        }
        chainSum.push({...chainObj.objectAction, actionKind: chainObj.kind})
      } else {
        contentSum += cleanTextFn(chainObj.content) + ' '
      }
    }
    if (contentSum) {
      chainSum.push(contentSum.replace(/(\s)*<br(\s)*\/>(\s)*/gi, '\u000D\u000A').trim())
    }
    chap.chainedContent = chainSum
  }
  chapters.forEach(seq => {
    seq.chain = seq.chain.map(({chain, chainedContent, ...rest}) => ({...rest}))
  })
  return chapters
}