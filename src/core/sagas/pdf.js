import { all, fork, takeEvery, put, select } from 'redux-saga/effects'
import { selectors as storySelectors } from 'core/reducers/story'
import {
  types as pdfTypes,
  actions as pdfActions,
  selectors as pdfSelectors
} from 'core/reducers/pdf'
import { utils } from 'moiki-exporter'
import clonedeep from 'lodash.clonedeep'
import { cleanContent } from 'utils/pdf-story-utils'
import { shuffleArray } from 'utils/functions-utils'

const { simplifyStory } = utils

const shuffleSequences = (sequences) => {
  const middleIndex = Math.floor(sequences.length / 2)
  const middleSize = sequences.length - (middleIndex + 1)
  return [
    0,
    ...shuffleArray(Array.from({length: middleSize}, (_, k) => k + 1)),
    ...shuffleArray(Array.from({length: sequences.length - (middleSize + 1)}, (_, k) => k + middleSize + 1))
  ]
}

export function *initPdfSaga(action) {
  const story = yield select(storySelectors.story)
  const { meta, assets } = story
  let variables = {}
  for (let asset of assets) {
    variables[asset.id] = asset
  }
  const sequences = simplifyStory(clonedeep(story), variables, cleanContent)
  const sequencesShuffle = shuffleSequences(sequences)
  yield put(pdfActions.updateStory({meta, variables, sequences, sequencesShuffle}))
}

export function *shuffleSaga(action) {
  const story = yield select(pdfSelectors.story)
  const sequencesShuffle = shuffleSequences(story.sequences)
  yield put(pdfActions.updateStory({...story, sequencesShuffle}))
}

// -- watchers

export function *watchInit() {
  yield takeEvery(pdfTypes.INIT_PDF, initPdfSaga)
}

export function *watchShuffle() {
  yield takeEvery(pdfTypes.SHUFFLE_SEQUENCES, shuffleSaga)
}

// -- init

export function *pdfSaga() {
  yield all([
    fork(watchInit),
    fork(watchShuffle)
  ])
}