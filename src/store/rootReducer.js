import { combineReducers } from '@reduxjs/toolkit'

import sortReducer from './sortReducer'
import checkboxReducer from './checkboxReducer'
import ticketsReducer from './ticketReducer'

const rootReducer = combineReducers({
  sort: sortReducer,
  checkboxes: checkboxReducer,
  tickets: ticketsReducer,
})

export default rootReducer
