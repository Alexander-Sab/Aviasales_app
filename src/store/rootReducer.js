import { combineReducers } from '@reduxjs/toolkit'

import sortReducer from './sortReducer'
import checkboxReducer from './checkboxReducer'
import ticketsReducer from './ticketReducer'
import filtersReducer from './filtersSlice'

const rootReducer = combineReducers({
  sort: sortReducer,
  filters: filtersReducer,
  checkboxes: checkboxReducer,
  tickets: ticketsReducer,
})

export default rootReducer
