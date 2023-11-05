const initialState = {
  tickets: [],
  loading: false,
  error: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS_SUCCESS':
      return {
        ...state,
        tickets: action.payload,
        loading: false,
        error: null,
      }
    case 'FETCH_TICKETS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export default reducer
