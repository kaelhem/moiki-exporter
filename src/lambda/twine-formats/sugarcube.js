const { areBracketsBalanced } = require('./utils')
/*
const extractVars = (str) => {
  return str.match(/\([s|S]et:\s*\$([a-zA-Z0-9_.]+)\sto\s(.+)\)/gim)
}

const extractConditions = (str) => {
  return str.match(/\([i|I]f:\s*(.+)\)/gim)
}
*/

const convertStatement = (statement) => {
  return {
    raw: statement,
    kind: 'text',
    data: {
      balanced: areBracketsBalanced(statement)
    }
  }
}

module.exports = {
  convertStatement
}