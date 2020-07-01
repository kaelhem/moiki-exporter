import { createStore, compose } from 'redux'
import { createBrowserHistory } from 'history'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createRootReducer from './reducers'
import createMiddlewares, { runSaga } from './middlewares'
import { getUserConfirmation } from 'components/router-user-confirm'

const reduxDevTools = process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

export const history = createBrowserHistory({getUserConfirmation})

const persistConfig = {
  key: 'moiki-exporter',
  blacklist: ['router'],
  storage
}

const configureStore = (initialState) => {
  const persistedReducer = persistReducer(persistConfig, createRootReducer(history))
  const store = createStore(persistedReducer, initialState, compose(createMiddlewares(history), reduxDevTools))
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(persistReducer(persistConfig, createRootReducer(history)))
    })
  }
  runSaga()
  const persistor = persistStore(store)
  return { store, persistor }
}

export default configureStore