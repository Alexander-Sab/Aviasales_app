const initialState = {
  sortType: 'default', // тип сортировки по умолчанию
}

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT_TYPE':
      return {
        ...state,
        sortType: action.payload,
      }
    default:
      return state
  }
}
export const setSortType = (sortType) => ({
  type: 'SET_SORT_TYPE',
  payload: sortType,
})
export default sortReducer
