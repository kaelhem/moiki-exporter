const { areBracketsBalanced, convertLink } = require('./utils')

const extractSetVar = (content) => {
  const matcher = /\([s|S]et:\s*\$([a-zA-Z0-9_.]+)\sto\s(.+)\)/gim.exec(content)
  if (matcher && matcher.length > 1) {
    return {
      varname: matcher[1],
      value: matcher[2]
    }
  }
  return null
}

const harloweOperators = [
  'is\snot', // Evaluates to true if both sides are not equal.	$friends is not $enemies
  'is\sin', // Evaluates to true if the right side contains the left side.	"ugh" is in "Through"
  'is', // Evaluates to true if both sides are equal, otherwise false.	$bullets is 5
  '>', // Evaluates to true if the left side is greater than the right side.	$money > 3.75
  '>=', // Evaluates to true if the left side is greater than or equal to the right side.	$apples >= $carrots + 5
  '<', // Evaluates to true if the left side is less than the right side.	$shoes < $people * 2
  '<=', // Evaluates to true if the left side is less than or equal to the right side.	65 <= $age
  'and', // Evaluates to true if both sides evaluates to true.	$hasFriends and $hasFamily
  'or', // Evaluates to true if either side is true.	$fruit or $vegetable
  'contains', // Evaluates to true if the left side contains the right side.	"Fear" contains "ear"
  'not'
]

const getValueType = (value) => {
  const lowerCase = value.toLowerCase()
  if (lowerCase === 'true' || lowerCase === 'false') {
    return 'Boolean'
  }
  if ((value || value === '0') && parseInt(value, 10).toString() === value) {
    return 'Number'
  }
  return '???'
}

const convertCondition = (twineCondition) => {
  const rawCondition = twineCondition
    .replace(/>=/gim, '≥')
    .replace(/<=/gim, '≤')
    .replace(/[>≥<≤]/gim, ' $& ')
    .replace(/≥/gim, '>=')
    .replace(/≤/gim, '<=')
    .replace(/\s+/gim, ' ')
    .trim()
  const condParts = rawCondition.split(' ').map(x => ({
    data: x,
    kind: x.startsWith('$') ? 'var' : (harloweOperators.includes(x.toLowerCase()) ? 'operator' : 'value')
  }))
  if (condParts.length === 3) {
    return {
      kind: 'counter',
      query: {
        params: [{
          target: '',
          condition: '',
          value: 0
        }]
      }
    }
  }
  return condParts
  let regexp = new RegExp('(.+)\s+(' + harloweOperators.join('|') + ')\s+(.+)', 'gmi')
  let matcher = regexp.exec(twineCondition)
  if (matcher && matcher.length > 2) {
    console.log('A.', matcher)
  } else {
    regexp = new RegExp('not\s+?(.+)', 'gmi')
    matcher = regexp.exec(twineCondition)
    if (matcher && matcher.length > 1) {
      console.log('B.', matcher)
    } else {
      console.log('C.', twineCondition)
    }
  }
  return twineCondition
}

const extractCondition = (content) => {
  const matcher = /\([i|I]f:\s*(.+)\)/gim.exec(content)
  if (matcher && matcher.length > 0) {
    return convertCondition(matcher[1])
  }
  return null
}

const convertStatement = (statement) => {
  const condition = extractCondition(statement)
  const link = convertLink(statement)
  if (link) {
    return {
      raw: statement,
      kind: 'link',
      data: {
        ...link,
        condition
      }
    }
  }
  const vars = extractSetVar(statement)
  if (vars) {
    return {
      raw: statement,
      kind: 'vars',
      data: {
        balanced: areBracketsBalanced(statement),
        vars,
        condition
      }
    }
  }
  return {
    raw: statement,
    kind: 'text',
    data: {
      balanced: areBracketsBalanced(statement),
      condition
    }
  }
}

module.exports = {
  convertStatement
}