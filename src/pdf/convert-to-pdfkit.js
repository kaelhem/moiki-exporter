import { utils } from 'moiki-exporter'
import PDFDocument from 'pdfkit/js/pdfkit.standalone'
import { getFont, loadFont } from 'utils/pdf-story-utils'
const blobStream = require('blob-stream')
const { getAuthor } = utils

const IMAGE_CACHE = {
  src: null,
  w: 0,
  h: 0,
  ratio: 0,
  datauri: null
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
  const { meta, variables, sequences, sequencesShuffle } = story

  const font = {
    REGULAR: getFont(settings.font, 0),
    BOLD: getFont(settings.font, 1),
    ITALIC: getFont(settings.font, 2),
    BOLD_ITALIC: getFont(settings.font, 3)
  }

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
        if (bufferFont) {
          doc.registerFont(fontName, bufferFont)
        }
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
  if (meta.image) {
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
  } else {
    doc.moveDown(10)
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
        height += doc.heightOfString(chain, {align: 'justify'})
        height += doc.currentLineHeight(true) * .5
      } else {
        height += doc.currentLineHeight(true)
        height += doc.font(font.BOLD).heightOfString(chain.label.trim())
        doc.font(font.REGULAR)
        height += 60
        height += doc.currentLineHeight(true) * .5
        height += doc.font(font.ITALIC).heightOfString(chain.desc.trim())
        doc.font(font.REGULAR)
        height += doc.currentLineHeight(true) * 1.5
      }
    }
    // manage choices
    if (hasChoices) {
      lastEntry.choices.forEach((choice) => {
        height += doc.font(font.BOLD).heightOfString(choice.content)
        doc.font(font.ITALIC).fontSize(settings.fontSize < 12 ? settings.fontSize : 12)
        const cond = choice.conditions && choice.conditions.length === 1 ? choice.conditions[0] : null
        if (cond && cond.next && cond.query && cond.query.params && cond.query.params[0] && cond.query.params[0].target && getSequenceByIndex(cond.next) !== getSequenceByIndex(choice.next)) {
          if (cond.query.params[0].condition === 'with') {
            // with object
            height += doc.heightOfString(`Avec l'objet "${variables[cond.query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(cond.next)} (p.${pageLinksMap[cond.next] || 'XX'})`, { underline: true }) - 2
            height += doc.heightOfString(`Sinon : rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, { underline: true})
          } else {
            // without object
            height += doc.heightOfString(`Avec l'objet "${variables[cond.query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, { underline: true }) - 2
            height += doc.heightOfString(`Sinon : rendez-vous en ${getSequenceByIndex(cond.next)} (p.${pageLinksMap[cond.next] || 'XX'})`, { underline: true})
          }
        } else {
          height += doc.heightOfString(`Rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, { underline: true }) - 2
        }
        doc.fontSize(settings.fontSize).font(font.REGULAR)
      })
    }

    // manage simple conditions
    if (!hasChoices && lastEntry.conditions && lastEntry.conditions.length === 1 && lastEntry.conditions[0].next) {
      doc.fontSize(settings.fontSize < 12 ? settings.fontSize : 12).font(font.ITALIC)
      if (getSequenceByIndex(lastEntry.conditions[0].next) !== getSequenceByIndex(lastEntry.next)) {
        if (lastEntry.conditions[0].query.params[0].condition === 'with') {
          // with object
          height += doc.heightOfString(`Avec l'objet "${variables[lastEntry.conditions[0].query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(lastEntry.conditions[0].next)} (p.${pageLinksMap[lastEntry.conditions[0].next] || 'XX'})`, { underline: true }) - 2
          height += doc.heightOfString(`Sinon : rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, { underline: true })
        } else {
          // without object
          height += doc.heightOfString(`Avec l'objet "${variables[lastEntry.conditions[0].query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, { underline: true }) - 2
          height += doc.heightOfString(`Sinon : rendez-vous en ${getSequenceByIndex(lastEntry.conditions[0].next)} (p.${pageLinksMap[lastEntry.conditions[0].next] || 'XX'})`, { underline: true })
        }
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
        doc.text(chain, {align: 'justify'})
        doc.moveDown(.5)
      } else {
        doc.moveDown()
        if (doc.y + 60 + settings.margins.bottom + 2.5 * doc.currentLineHeight(true) > doc.page.height) {
          doc.addPage()
        }
        doc.font(font.BOLD).fillColor('#999').text(chain.label.trim())
        doc.moveDown(.5)
        doc.font(font.REGULAR)
        doc.image(chain.pngIcon, {fit: [doc.page.width - horizontalMargin, 60], align: 'center'})
        doc.moveDown(.5)
        doc.font(font.ITALIC).text(chain.desc.trim(), {align: 'center'})
        doc.font(font.REGULAR).fillColor('#000')
        doc.moveDown(1.5)
      }
    }
    // manage choices
    if (hasChoices) {
      let numLineForChoices = 0
      lastEntry.choices.forEach((choice) => {
        ++numLineForChoices
        if (choice.conditions && choice.conditions.length === 1) {
          numLineForChoices += 2
        } else {
          ++numLineForChoices
        }
      })
      if (doc.y + settings.margins.bottom + numLineForChoices * doc.currentLineHeight(true) > doc.page.height) {
        doc.addPage()
      }
      lastEntry.choices.forEach((choice) => {
        doc.font(font.BOLD).text(choice.content, {align: 'center'}).font(font.ITALIC).fontSize(settings.fontSize < 12 ? settings.fontSize : 12).fillColor('#066ddd')
        const docX = doc.x

        const cond = choice.conditions && choice.conditions.length === 1 ? choice.conditions[0] : null
        if (cond && cond.next && cond.query && cond.query.params && cond.query.params[0] && cond.query.params[0].target && getSequenceByIndex(cond.next) !== getSequenceByIndex(choice.next)) {
          if (cond.query.params[0].condition === 'with') {
            // with object
            doc.text(`Avec l'objet "${variables[cond.query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(cond.next)} (p.${pageLinksMap[cond.next] || 'XX'})`, 0, doc.y - 2, { goTo: cond.next, underline: true, align: 'center', width: doc.page.width })
            doc.text(`Sinon : rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, 0, doc.y, { goTo: choice.next, underline: true, align: 'center', width: doc.page.width })
          } else {
            // without object
            doc.text(`Avec l'objet "${variables[cond.query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, 0, doc.y - 2, { goTo: choice.next, underline: true, align: 'center', width: doc.page.width })
            doc.text(`Sinon : rendez-vous en ${getSequenceByIndex(cond.next)} (p.${pageLinksMap[cond.next] || 'XX'})`, 0, doc.y, { goTo: cond.next, underline: true, align: 'center', width: doc.page.width })
          }
        } else {
          doc.text(`Rendez-vous en ${getSequenceByIndex(choice.next)} (p.${pageLinksMap[choice.next] || 'XX'})`, 0, doc.y - 2, { goTo: choice.next, underline: true, align: 'center', width: doc.page.width })
        }
        doc.fontSize(settings.fontSize).font(font.REGULAR).fillColor('#000')
        doc.x = docX
      })
    }

    // manage simple conditions
    if (!hasChoices && lastEntry.conditions && lastEntry.conditions.length === 1 && lastEntry.conditions[0].next) {
      const docX = doc.x
      doc.fontSize(settings.fontSize < 12 ? settings.fontSize : 12)
      if (doc.y + settings.margins.bottom + 2 * doc.currentLineHeight(true) > doc.page.height) {
        doc.addPage()
      }
      doc.font(font.ITALIC).fillColor('#066ddd')
      if (getSequenceByIndex(lastEntry.conditions[0].next) !== getSequenceByIndex(lastEntry.next)) {
        if (lastEntry.conditions[0].query.params[0].condition === 'with') {
          // with object
          doc.text(`Avec l'objet "${variables[lastEntry.conditions[0].query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(lastEntry.conditions[0].next)} (p.${pageLinksMap[lastEntry.conditions[0].next] || 'XX'})`, 0, doc.y - 2, { goTo: lastEntry.conditions[0].next, underline: true, align: 'center', width: doc.page.width })
          doc.text(`Sinon : rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, 0, doc.y, { goTo: lastEntry.next, underline: true, align: 'center', width: doc.page.width })
        } else {
          // without object
          doc.text(`Avec l'objet "${variables[lastEntry.conditions[0].query.params[0].target].label.trim()}" : rendez-vous en ${getSequenceByIndex(lastEntry.next)} (p.${pageLinksMap[lastEntry.next] || 'XX'})`, 0, doc.y - 2, { goTo: lastEntry.next, underline: true, align: 'center', width: doc.page.width })
          doc.text(`Sinon : rendez-vous en ${getSequenceByIndex(lastEntry.conditions[0].next)} (p.${pageLinksMap[lastEntry.conditions[0].next] || 'XX'})`, 0, doc.y, { goTo: lastEntry.conditions[0].next, underline: true, align: 'center', width: doc.page.width })
        }
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
  return {stream, pageLinksMap}
}