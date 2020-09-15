export const convertId = (id, prefix= 'story') => prefix + '_' + id.replace(/-/gi, '_')

export const cleanContent = (content) => {
  return content
    .replace(/(<\/*(strong|b)>)/gi, '')
    .replace(/(<\/*(em)>)/gi, '')
    .replace(/(<\/*(h\d)>)/gi, '')
    .replace(/<span class="ql-cursor">/gi, '')
    .replace(/<\/p>/gi, '</p> ')
    .replace(/<\/*p>/gi, '')
    .replace(/(<\/*(span)>)/gi, '')
    .replace(/(\s)+/gi, ' ')
    .replace(/\@/gim, '@@64')
    .replace(/\^/gim, '@@94')
    .replace(/\\/gim, '@@92')
    .replace(/\~/gim, '@@126')
    .replace(/\°/gim, ' ') // FIXME! the @@225 code seems to not work (event with the "Zcharacter table + '@{00B0}';" directive)
    .replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi, '^')
    .replace(/(\s)*&nbsp;(\s)*/gi, ' ') // maybe: [unicode 160] ?
    .replace(/(\"|“|”)/gim, '~')
    .replace(/\’/gim, '\'')
    .trim()
}