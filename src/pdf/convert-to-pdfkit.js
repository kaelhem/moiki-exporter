import { utils } from 'moiki-exporter'
import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import clonedeep from 'lodash.clonedeep'
const blobStream = require('blob-stream')

const { getAuthor, simplifyStory } = utils

const shuffleArray = (arr) => {
  const array = [...arr]
  for (let i = array.length - 1; i > 0; --i) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const fontFormat = {
  REGULAR: 0,
  BOLD: 1,
  ITALIC: 2,
  BOLD_ITALIC: 3
}

const getFont = (font, format=fontFormat.REGULAR) => {
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

const IMAGE_CACHE = {
  src: null,
  w: 0,
  h: 0,
  ratio: 0,
  datauri: null
}

const loadFont = async (font) => {
  try {
    return await fetch('/fonts/' + font + '.ttf').then(response => response.arrayBuffer())
  } catch (e) {
    console.log(e)
  }
}

const getImageDataUri = (url, width, height) => {
  return new Promise((resolve, reject) => {
    const {src, w, h, datauri} = IMAGE_CACHE
    if (datauri && url === src && width === w && height === h) {
      resolve(IMAGE_CACHE)
    } else {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = width // or 'width' if you want a special/scaled size
          canvas.height = height // or 'height' if you want a special/scaled size
          const ratioX = canvas.width / image.naturalWidth
          const ratioY = canvas.height / image.naturalHeight
          const ratio = Math.min(ratioX, ratioY)
          canvas.getContext('2d').drawImage(image, 0, 0, image.naturalWidth * ratio, image.naturalHeight * ratio)
          IMAGE_CACHE.src = url
          IMAGE_CACHE.w = width
          IMAGE_CACHE.h = height
          IMAGE_CACHE.ratio = ratio
          IMAGE_CACHE.datauri = canvas.toDataURL('image/png')
          resolve(IMAGE_CACHE)
        } catch (e) {
          reject(e)
        }
      }
      image.onerror = (e) => {
        reject(e)
      }
      image.src = url
    }
  })
}

export const generatePdfStream = async (story, settings, pdfData=null) => {
  const { meta, assets } = story
  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = asset
  }

  const cleanContent = content => {
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

  const font = {
    REGULAR: getFont(settings.font, 0),
    BOLD: getFont(settings.font, 1),
    ITALIC: getFont(settings.font, 2),
    BOLD_ITALIC: getFont(settings.font, 3)
  }
  
  /*
  const applyStyle = (kind) => {
    switch (kind) {
      case 'b': return [font.BOLD, settings.fontSize]; break
      case 'em': return [font.ITALIC, settings.fontSize]; break
      case 'h1': return [font.BOLD, settings.fontSize + 10]; break
      case 'h2': return [font.BOLD, settings.fontSize + 8]; break
      case 'h3': return [font.BOLD, settings.fontSize + 6]; break
      case 'h4': return [font.BOLD, settings.fontSize + 4]; break
      case 'h5': return [font.REGULAR, settings.fontSize + 4]; break
      case 'h6': return [font.REGULAR, settings.fontSize + 2]; break
      default: return [font.REGULAR, settings.fontSize]
    }
  }
  */

  let sequences = simplifyStory(clonedeep(story), variables, cleanContent)
  const middleIndex = Math.floor(sequences.length / 2)
  const middleSize = sequences.length - (middleIndex + 1)
  let sequencesShuffle = !pdfData ? [
    0,
    ...shuffleArray(Array.from({length: middleSize}, (_, k) => k + 1)),
    ...shuffleArray(Array.from({length: sequences.length - (middleSize + 1)}, (_, k) => k + middleSize + 1))
  ] : pdfData.sequencesShuffle
  const doc = new PDFDocument({
    size: settings.format,
    bufferPages: true,
    margins : settings.margins,
    info: {
      Title: meta.name, 
      Author: getAuthor(meta), // the name of the author
      Subject: 'Une histoire dont vous êtes le héros', // the subject of the document
      Keywords: 'Moiki;LDVELH' // keywords associated with the document
    }
  })

  //console.log(doc.page.width, doc.page.height)

  // loading custom fonts
  if (settings.font.endsWith('*')) {
    for (let i of [0,1,2,3]) {
      const fontName = getFont(settings.font, i)
      if (!doc._registeredFonts[fontName]) {
        const bufferFont = await loadFont(fontName)
        doc.registerFont(fontName, bufferFont)
      }
    }
  }

  const stream = doc.pipe(blobStream())

  // Manage current page number on elements
  let pageNumber = 1
  doc.on('pageAdded', () => {
    ++pageNumber
  })

  const horizontalMargin = settings.margins.left + settings.margins.right

  doc.fillColor('#999').font(font.ITALIC).fontSize(12).text('Moiki présente', {
    width: doc.page.width - horizontalMargin,
    align: 'center'
  })
  doc.moveDown()
  doc.fillColor('black').font(font.BOLD).fontSize(24).text(meta.name, {
    width: doc.page.width - horizontalMargin,
    align: 'center'
  })
  doc.moveDown(.5)
  doc.fillColor('#999').font(font.ITALIC).fontSize(11).text('Une histoire dont vous êtes le héros, de', {
    width: doc.page.width - horizontalMargin,
    align: 'center',
  })
  doc.fillColor('#000').font(font.BOLD).fontSize(14).text(getAuthor(meta), {
    width: doc.page.width - horizontalMargin,
    align: 'center'
  })
  doc.moveDown()

  doc.font(font.REGULAR).fontSize(12)

  try {
    const imgWidth = doc.page.width - horizontalMargin - 100
    const imgHeight = imgWidth * 3 / 4
    const {datauri} = await getImageDataUri(meta.image, imgWidth, imgHeight)
    doc.moveDown()
    doc.image(datauri, {fit: [doc.page.width - horizontalMargin, imgHeight], align: 'center'})
    doc.moveDown()
  } catch (e) {
    console.log(e)
  }

  doc.text(meta.description, {
    width: doc.page.width - horizontalMargin,
    align: 'center'
  })

  doc.addPage() 

  doc.font(font.REGULAR).fontSize(settings.fontSize)

  const getSequenceByIndex = (id) => {
    const seqIndex = sequences.findIndex(s => s.id === id)
    return sequencesShuffle.findIndex(x => x === seqIndex) + 1
  }

  const pageLinksMap = pdfData ? {...pdfData.pageLinksMap} : {}

  const getSequenceHeight = (sequence) => {
    let height = 0
    const lastEntry = sequence.chain.slice(-1)[0]
    const hasChoices = lastEntry.choices && lastEntry.choices.length > 0
    if (doc.y > settings.margins.top) {
      height += doc.currentLineHeight(true)
    }
    height += doc.font(font.BOLD).fontSize(settings.fontSize + 10).heightOfString(sequenceIndex)
    doc.font(font.REGULAR).fontSize(settings.fontSize)

    for (let chain of sequence.chainedContent) {
      if (typeof chain === 'string') {
        height += doc.heightOfString(chain.trim(), {align: 'justify'})
        height += doc.currentLineHeight(true) * .5
      } else {
        height += doc.currentLineHeight(true)
        height += 60
        height += doc.currentLineHeight(true) * .5
        height += doc.font(font.ITALIC).heightOfString(chain.desc.trim())
        doc.font(font.REGULAR)
        height += doc.currentLineHeight(true) * 1.5
      }
    }
    // manage choices
    if (hasChoices) {
      lastEntry.choices.forEach((choice, choiceIdx) => {
        height += doc.font(font.BOLD).heightOfString(choice.content)
        doc.font(font.ITALIC).fontSize(settings.fontSize < 12 ? settings.fontSize : 12)
        if (choice.condition && choice.condition.next && choice.condition.params && getSequenceByIndex(choice.condition.next) !== getSequenceByIndex(choice.next)) {
          height += doc.heightOfString(`Avec l'objet "${variables[choice.condition.params].desc.trim()}" : rendez-vous en ${getSequenceByIndex(choice.condition.next)} (p.${pageLinksMap[choice.condition.next] || 'XX'})`, { underline: true }) - 2
          height += doc.heightOfString(`Sinon : rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, { underline: true})
        } else {
          height += doc.heightOfString(`Rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, { underline: true }) - 2
        }
        doc.fontSize(settings.fontSize).font(font.REGULAR)
      })
    }

    // manage simple conditions
    if (!hasChoices && lastEntry.condition && lastEntry.condition.params && lastEntry.condition.next) {
      doc.fontSize(settings.fontSize < 12 ? settings.fontSize : 12).font(font.ITALIC)
      if (getSequenceByIndex(lastEntry.condition.next) !== getSequenceByIndex(lastEntry.next)) {
        height += doc.heightOfString(`Avec l'objet "${variables[lastEntry.condition.params].desc.trim()}" : rendez-vous en ${getSequenceByIndex(lastEntry.condition.next)} (p.${pageLinksMap[lastEntry.condition.next] || 'XX'})`, { underline: true }) - 2
        height += doc.heightOfString(`Sinon : rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, { underline: true })
      } else {
        height += doc.heightOfString(`Rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, { underline: true }) - 2
      }
      doc.fontSize(settings.fontSize).font(font.REGULAR)
    }
    return height
  }

  let sequenceIndex = 1
  for (let i of sequencesShuffle) {
    const sequence = sequences[i]
    const lastEntry = sequence.chain.slice(-1)[0]
    const hasChoices = lastEntry.choices && lastEntry.choices.length > 0
    const sequenceHeight = getSequenceHeight(sequence)
    if (settings.avoidSequencesSplitting) {
      if (doc.y + sequenceHeight > doc.page.height - settings.margins.top * 2) {
        doc.addPage()
      }
    } else {
      if (doc.y > settings.margins.top) {
        doc.moveDown()
      }
      if (doc.y + settings.margins.bottom + 6 * doc.currentLineHeight(true) > doc.page.height) {
        doc.addPage()
      }
    }
    doc.font(font.BOLD).fontSize(settings.fontSize + 10).text(sequenceIndex, { destination: sequence.id })
    pageLinksMap[sequence.id] = pageNumber
    doc.font(font.REGULAR).fontSize(settings.fontSize)

    for (let chain of sequence.chainedContent) {
      if (typeof chain === 'string') {
        doc.text(chain.trim(), {align: 'justify'})
        doc.moveDown(.5)
      } else {
        doc.moveDown()
        if (doc.y + 60 + settings.margins.bottom + 2 * doc.currentLineHeight(true) > doc.page.height) {
          doc.addPage()
        }
        doc.image(chain.pngIcon, {fit: [doc.page.width - horizontalMargin, 60], align: 'center'})
        doc.moveDown(.5)
        doc.font(font.ITALIC).fillColor('#999').text(chain.desc.trim(), {align: 'center'})
        doc.font(font.REGULAR).fillColor('#000')
        doc.moveDown(1.5)
      }
    }
    // manage choices
    if (hasChoices) {
      let numLineForChoices = 0
      lastEntry.choices.forEach((choice, choiceIdx) => {
        ++numLineForChoices
        if (choice.condition && choice.condition.next && choice.condition.params) {
          numLineForChoices += 2
        } else {
          ++numLineForChoices
        }
      })
      if (doc.y + settings.margins.bottom + numLineForChoices * doc.currentLineHeight(true) > doc.page.height) {
        doc.addPage()
      }
      lastEntry.choices.forEach((choice, choiceIdx) => {
        doc.font(font.BOLD).text(choice.content, {align: 'center'}).font(font.ITALIC).fontSize(settings.fontSize < 12 ? settings.fontSize : 12).fillColor('#066ddd')
        const docX = doc.x
        if (choice.condition && choice.condition.next && choice.condition.params && getSequenceByIndex(choice.condition.next) !== getSequenceByIndex(choice.next)) {
          doc.text(`Avec l'objet "${variables[choice.condition.params].desc.trim()}" : rendez-vous en ${getSequenceByIndex(choice.condition.next)} (p.${pageLinksMap[choice.condition.next] || 'XX'})`, 0, doc.y - 2, { goTo: choice.condition.next, underline: true, align: 'center', width: doc.page.width })
          doc.text(`Sinon : rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, 0, doc.y, { goTo: choice.next, underline: true, align: 'center', width: doc.page.width })
        } else {
          doc.text(`Rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, 0, doc.y - 2, { goTo: choice.next, underline: true, align: 'center', width: doc.page.width })
        }
        doc.fontSize(settings.fontSize).font(font.REGULAR).fillColor('#000')
        doc.x = docX
      })
    }

    // manage simple conditions
    if (!hasChoices && lastEntry.condition && lastEntry.condition.params && lastEntry.condition.next) {
      const docX = doc.x
      doc.fontSize(settings.fontSize < 12 ? settings.fontSize : 12)
      if (doc.y + settings.margins.bottom + 2 * doc.currentLineHeight(true) > doc.page.height) {
        doc.addPage()
      }
      doc.font(font.ITALIC).fillColor('#066ddd')
      if (getSequenceByIndex(lastEntry.condition.next) !== getSequenceByIndex(lastEntry.next)) {
        doc.text(`Avec l'objet "${variables[lastEntry.condition.params].desc.trim()}" : rendez-vous en ${getSequenceByIndex(lastEntry.condition.next)} (p.${pageLinksMap[lastEntry.condition.next] || 'XX'})`, 0, doc.y - 2, { goTo: lastEntry.condition.next, underline: true, align: 'center', width: doc.page.width })
        doc.text(`Sinon : rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, 0, doc.y, { goTo: lastEntry.next, underline: true, align: 'center', width: doc.page.width })
      } else {
        doc.text(`Rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, 0, doc.y - 2, { goTo: lastEntry.next, underline: true, align: 'center', width: doc.page.width })
      }
      doc.fontSize(settings.fontSize).font(font.REGULAR).fillColor('#000')
      doc.x = docX
    }
    ++sequenceIndex
  }


  /*

  // just trying to manage font styles (bold, italic, h1, h2, ... but it dost't work very well...)

  let debug = ''
  sequences && sequences.map((sequence, idx) => {
    const regexp = /<\/*(b|em|h\d)>/
    let isFirstChain = true
    for (let chain of sequence.chainedContent) {
      if (!isFirstChain) {
        doc.moveDown()
        //doc.text('\n', {continued: false})
      }
      isFirstChain = false
      if (typeof chain === 'string') {
        const splitted = chain.split(regexp)
        let styles = applyStyle()
        let isOpenedTag = false
        for (let chainPiece of splitted) {
          const isTag = /^(b|em|h\d)$/.test(chainPiece)
          if (isTag && !isOpenedTag) {
            isOpenedTag = true
            styles = applyStyle(chainPiece)
            if (chainPiece.startsWith('h')) {
              doc.moveDown()
              doc.text('')
            }
          } else if (isTag && isOpenedTag) {
            isOpenedTag = false
            styles = applyStyle()
          } else {
            const lines = chainPiece.split('\n')
            let isFirstLine = true
            for (let line of lines) {
              doc.font(styles[0]).fontSize(styles[1]).text(line, {continued: !isFirstChain || !isFirstLine, align: 'justify'})
              debug += '\ndoc.font(`' + styles[0] + '`).fontSize(' + styles[1] + ').text(`' + line + '`, {continued: ' + !isFirstChain + ', align: \'justify\'})'
              isFirstLine = false
            }
          }
        }
      } else {
        // manage icon...
        doc.text('\n', {continued: false})
      }
    }
  })
  console.log(debug)
  */

  // Add page header and footer  
  const x = 0
  const footerY = doc.page.height - settings.margins.bottom / 2
  const headerY = settings.margins.top / 2
  const opts = {
    lineBreak: false,
    align: 'center',
    height: 20,
    width: doc.page.width
  }
  const range = doc.bufferedPageRange()
  const numPages = doc._pageBufferStart + doc._pageBuffer.length - 1
  for (let i = range.start + 1; i <= numPages; i++) {
    doc.switchToPage(i);
    doc.fillColor('#999').font(font.ITALIC).fontSize(10)
    // header
    doc.text(meta.name, x, headerY, {...opts, baseline: 'top'})

    // footer
    const content = 'page ' + (i + 1) + ' / ' + (numPages + 1)
    doc.font(font.REGULAR).text(content, x, footerY, {...opts, baseline: 'bottom'})
  }

  doc.end()
  return {stream, pageLinksMap, sequencesShuffle}
}