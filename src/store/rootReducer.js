import { combineReducers } from 'redux'

import sortReducer from './sortReducer'

const rootReducer = combineReducers({
  sort: sortReducer,
  // Другие редьюсеры, если есть
})

export default rootReducer
