import { all, fork } from 'redux-saga/effects'
import { redirectSaga } from './redirect'
import { storySaga } from './story'
//import { pdfSaga } from './pdf'

function *appSaga() {
  yield all([
    fork(redirectSaga),
    fork(storySaga),
    //fork(pdfSaga)
  ])
}

export default () => all([
  fork(appSaga)
])