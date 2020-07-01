import { all, fork, takeEvery, put, select } from 'redux-saga/effects'
import {
  types as storyTypes,
  messages as storyMessages,
  selectors as storySelectors
} from 'core/reducers/story'
import kebabCase from 'lodash.kebabcase'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { svgAsPngUri } from 'save-svg-as-png'
import {
  convertToInk,
  convertToTwee,
  convertToJdrBot
} from 'moiki-exporter'

const generatePngIcons = async (storyData) => {
  const parser = new DOMParser()
  for (let asset of storyData.assets) {
    try {
      const svgString = decodeURIComponent(asset.icon.replace(/data:image\/svg\+xml,/g, ''))
      const doc = parser.parseFromString(svgString, 'image/svg+xml')
      const svgEl = doc.getElementsByTagName('svg')[0]
      const pngDataURI = await svgAsPngUri(svgEl, {excludeCss: true})
      asset.pngIcon = pngDataURI
    } catch (e) {
      console.log(e.message)
    }
  }
}

export function *importSaga(action) {
  try {
    const zip = yield JSZip.loadAsync(action.payload)
    let isJS = false
    let file = zip.file('story.json')
    if (!file) {
      file = zip.file('data.js')
      isJS = true
    }
    let fileContent = yield file.async('string')
    if (isJS) {
      fileContent = fileContent.slice(fileContent.indexOf('{'), -1)
    }
    const data = JSON.parse(fileContent)
    yield generatePngIcons(data)
    yield put(storyMessages.importSuccess(data))
  } catch (e) {
    yield put(storyMessages.importError('This file is not in the correct format!'))
  }
}

const getFormatManager = (format) => {
  switch (format) {
    case 'harlowe' : return { converter: s => convertToTwee(s, 'harlowe'), ext: 'twee' }
    case 'sugarcube' : return { converter: s => convertToTwee(s, 'sugarcube'), ext: 'twee' }
    case 'ink' : return { converter: convertToInk, ext: 'ink' }
    case 'jdrbot' : return { converter: convertToJdrBot, ext: 'txt' }
    default:
      throw new Error('format invalid')
  }
}

export function *exportSaga(action) {
  const story = yield select(storySelectors.story)
  try {
    const { ext, converter, asZip=false } = getFormatManager(action.payload)
    const filename = kebabCase(story.meta.name)
    if (asZip) {
      const zip = new JSZip()
      zip.file(filename + '.' + ext, converter(story))
      const blob = yield zip.generateAsync({type: 'blob'})
      saveAs(blob, filename + '.zip')
    } else {
      const blob = new Blob([converter(story)], {type: 'text/plain;charset=utf-8'})
      saveAs(blob, filename + '.' + ext)
    }
  } catch (e) {
    console.log(e)
    yield put(storyMessages.exportError('Oops, there is a bug :-('))
  }
}

// -- watchers

export function *watchImport() {
  yield takeEvery(storyTypes.IMPORT, importSaga)
}

export function *watchExport() {
  yield takeEvery(storyTypes.EXPORT, exportSaga)
}

// -- init

export function *storySaga() {
  yield all([
    fork(watchImport),
    fork(watchExport)
  ])
}