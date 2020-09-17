import { all, fork, takeEvery, put, select } from 'redux-saga/effects'
import {
  types as storyTypes,
  actions as storyActions,
  messages as storyMessages,
  selectors as storySelectors
} from 'core/reducers/story'
import kebabCase from 'lodash.kebabcase'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { svgAsPngUri } from 'save-svg-as-png'
import {
  convertToInk,
  convertToInform,
  convertToTwee,
  convertToJdrBot
} from 'moiki-exporter'

import windows1252 from 'windows-1252'

const generatePngIcons = async (storyData) => {
  const parser = new DOMParser()
  console.log(storyData.assets)
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

export function *importZip(zipData) {
  try {
    const zip = yield JSZip.loadAsync(zipData)
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
    console.log(e.message)
    yield put(storyMessages.importError('This file is not in the correct format!'))
  }
}

export function *importJson(data) {
  try {
    yield generatePngIcons(data)
    yield put(storyMessages.importSuccess(data))
  } catch (e) {
    console.log(e.message)
    yield put(storyMessages.importError('This file is not in the correct format!'))
  }
}

export function *importTwine(name, content) {
  try {
    const response = yield fetch('/.netlify/functions/import-from-twine', {
      method: 'post',
      body: JSON.stringify({name, content})
    })
    const story = yield response.json()
    const blob = new Blob([JSON.stringify(story, null, 4)], {type: 'text/plain;charset=utf-8'})
    saveAs(blob, 'twine-import.json')
    yield put(storyActions.clear())
  } catch (e) {
    console.log(e)
    yield put(storyMessages.exportError('Oops, there is a bug :-('))
  }
}

export function *importSaga(action) {
  const {ext, name, content} = action.payload
  switch (ext) {
    case 'zip':
      yield *importZip(content)
    break
    case 'json':
      yield *importJson(JSON.parse(content))
    break
    case 'html':
      yield *importTwine(name, content)
    break
    default:
      yield put(storyMessages.importError('This file is not in the correct format!'))
  }
}

const getFormatManager = (format) => {
  switch (format) {
    case 'harlowe' : return { converter: s => convertToTwee(s, 'harlowe'), ext: 'twee' }
    case 'sugarcube' : return { converter: s => convertToTwee(s, 'sugarcube'), ext: 'twee' }
    case 'ink' : return { converter: convertToInk, ext: 'ink' }
    case 'inform6' : return { converter: s => convertToInform(s, 'standard'), ext: 'zip' }
    case 'jdrbot' : return { converter: convertToJdrBot, ext: 'txt' }
    default:
      throw new Error('format invalid')
  }
}

export function *exportSaga(action) {
  const story = yield select(storySelectors.story)
  try {
    const { ext, converter } = getFormatManager(action.payload)
    const files = converter(story)
    const filename = kebabCase(story.meta.name)
    if (ext === 'zip') {
      const zip = new JSZip()
      for (let f of files) {
        if (f.asBinary) {
          zip.file(f.filename, windows1252.encode(f.data), {binary: true})
        } else {
          zip.file(f.filename, f.data)
        }
      }
      const blob = yield zip.generateAsync({type: 'blob'})
      saveAs(blob, filename + '.' + ext)
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