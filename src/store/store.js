import { createStore, combineReducers } from 'redux'

import counterReducer from './counterReducer'
import sortReducer from './sortReducer'
import checkboxReducer from './checkboxReducer'

const rootReducer = combineReducers({
  counter: counterReducer,
  sort: sortReducer,
  checkboxes: checkboxReducer,
  // Другие редюсеры, если есть
})

const store = createStore(rootReducer)
export default store
