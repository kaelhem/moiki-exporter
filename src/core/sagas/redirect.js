import { all, fork, take, put, select } from 'redux-saga/effects'
import { selectors as storySelectors } from 'core/reducers/story'
import { selectors as pdfSelectors } from 'core/reducers/pdf'
import { LOCATION_CHANGE, push as navigateTo, getLocation } from 'connected-react-router'

// -- watchers

export function *watchInitialLoad() {
  yield take('persist/REHYDRATE')
  yield take(LOCATION_CHANGE)
  const { pathname } = yield select(getLocation)
  const story = yield select(storySelectors.story)
  const pdf = yield select(pdfSelectors.isPdfView)
  if (story && pdf) {
    if (pathname !== '/create-pdf') {
      yield put(navigateTo('/createPdf'))
    }
  } else if (story) {
    if (pathname !== '/export') {
      yield put(navigateTo('/export'))
    }
  } else if (pathname !== '/') {
    if (pathname !== '/') {
      yield put(navigateTo('/'))
    }
  }
}

// -- init

export function *redirectSaga() {
  yield all([
    fork(watchInitialLoad)
  ])
}