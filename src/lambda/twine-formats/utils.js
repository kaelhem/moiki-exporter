const areBracketsBalanced = (input, brackets='[]{}()<>') => {
  let stack = []
  for(let bracket of input) {
    let bracketsIndex = brackets.indexOf(bracket)
    if (bracketsIndex === -1) {
      continue
    }
    if(bracketsIndex % 2 === 0) {
      stack.push(bracketsIndex + 1)
    } else {
      if(stack.length === 0 || stack.pop() !== bracketsIndex) {
        return false
      }
    }
  }
  return stack.length === 0
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

const convertLink = (content) => {
  let matcher = /\[\[(.+?)->(.+?)\]\]/gim.exec(content)
  if (matcher && matcher.length > 1) {
    return {
      content: matcher[1],
      next: matcher[2]
    }
  } else {
    matcher = /\[\[(.+?)\]\]/gim.exec(content)
    if (matcher && matcher.length > 0) {
      return {
        content: matcher[1],
        next: matcher[1]
      }
    }
  }
  return null
}

module.exports = {
  areBracketsBalanced,
  convertLink
}