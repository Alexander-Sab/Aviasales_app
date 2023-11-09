import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedFilter: '', // Начальное значение для selectedFilter
  // Другие свойства фильтров, если есть
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSelectedFilter(state, action) {
      state.selectedFilter = action.payload
    },
    // Другие редукторы фильтров, если есть
  },
})

export const { setSelectedFilter } = filtersSlice.actions
export default filtersSlice.reducer
