import { initialState } from './checkboxReducer'

export const checkboxReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHECKBOX_VALUE': {
      return {
        ...state,
        [action.payload.checkboxName]: action.payload.value,
      }
    }
    case 'TOGGLE_ALL_CHECKBOX': {
      export const allCheckboxValue = !state.all
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
