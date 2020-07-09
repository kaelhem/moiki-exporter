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
    .replace(/\s*<br\s*\/*>(\s|&nbsp;)*/gi, '\n')
    .replace(/(\s)*&nbsp;(\s)*/gi, '\u00A0')
    .trim()
}

export const unsecableSpaces = (str) => {
  return str.replace(/\s([?!:])/g, '\u00A0$1')
}

const fontFormat = {
  REGULAR: 0,
  BOLD: 1,
  ITALIC: 2,
  BOLD_ITALIC: 3
}

export const getFont = (font, format=fontFormat.REGULAR) => {
  let fontName = ''
  let fontStyles = null
  switch (font) {
    case 'courier':
      fontName = 'Courier'
      fontStyles = ['', '-Bold', '-Oblique', '-BoldOblique']
    break
    case 'times':
      fontName = 'Times'
      fontStyles = ['-Roman', '-Bold', '-Italic', '-BoldItalic']
    break
    case 'helvetica':
      fontName = 'Helvetica'
      fontStyles = ['', '-Bold', '-Oblique', '-BoldOblique']
    break
    case 'catamaran*':
      fontName = 'Catamaran/Catamaran'
      fontStyles = ['-Regular', '-Bold', '-Regular', '-Bold']
    break
    case 'comfortaa*':
      fontName = 'Comfortaa/Comfortaa'
      fontStyles = ['-Regular', '-Bold', '-Regular', '-Bold']
    break
    case 'muli*':
      fontName = 'Muli/Muli'
      fontStyles = ['-Regular', '-Bold', '-Regular', '-Bold']
    break
    case 'roboto*':
      fontName = 'Roboto/Roboto'
      fontStyles = ['-Regular', '-Bold', '-Regular', '-Bold']
    break
    default:
      return getFont('helvetica', format)
  }
  return fontName + fontStyles[format]
}

export const loadFont = async (font) => {
  try {
    return await fetch('/fonts/' + font + '.ttf').then(response => response.arrayBuffer())
  } catch (e) {
    console.log(e)
  }
  return null
}