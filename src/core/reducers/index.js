import { combineReducers } from 'redux'
//import * as storage from 'redux-storage'
import { connectRouter } from 'connected-react-router'
import story from './story'
import pdf from './pdf'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  story,
  pdf
})

export default createRootReducer