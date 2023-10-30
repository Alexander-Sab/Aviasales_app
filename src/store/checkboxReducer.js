const initialState = {
  all: false,
  withoutTransfers: false,
  oneTransfer: false,
  twoTransfers: false,
  threeTransfers: false,
}

const checkboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHECKBOX_VALUE': {
      return {
        ...state,
        [action.payload.checkboxName]: action.payload.value,
      }
    }
    case 'TOGGLE_ALL_CHECKBOX': {
      const allCheckboxValue = !state.all
      return {
        ...state,
        all: allCheckboxValue,
        withoutTransfers: allCheckboxValue,
        oneTransfer: allCheckboxValue,
        twoTransfers: allCheckboxValue,
        threeTransfers: allCheckboxValue,
      }
    }
    default:
      return state
  }
}
export const setCheckboxValue = (checkboxName, value) => {
  return {
    type: 'SET_CHECKBOX_VALUE',
    payload: {
      checkboxName,
      value,
    },
  }
}

export const toggleAllCheckbox = (value) => {
  return {
    type: 'TOGGLE_ALL_CHECKBOX',
    payload: value,
  }
}
export default checkboxReducer
