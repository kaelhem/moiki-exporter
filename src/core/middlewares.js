import { applyMiddleware } from 'redux'
import combineActionsMiddleware from 'redux-combine-actions'
import createSagaMiddleware from 'redux-saga'
import getSagas from './sagas'
import { routerMiddleware } from 'connected-react-router'

const sagaMiddleware = createSagaMiddleware()

const createMiddlewares = (history) => {
  return applyMiddleware(
    routerMiddleware(history),
    combineActionsMiddleware,
    sagaMiddleware
  )
}

export default createMiddlewares

export function runSaga() {
  let sagaTask = sagaMiddleware.run(function* () {
    yield getSagas()
  })
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./sagas', () => {
      const getNewSagas = require('./sagas').default
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(function* () {
          yield getNewSagas()
        })
      })
    })
  }
}