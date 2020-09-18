import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import story from './story'
import pdf from './pdf'
import inform from './inform'

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  story,
  pdf,
  inform
})

export default createRootReducer