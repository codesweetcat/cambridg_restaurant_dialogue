//Reducer for argumentRow information Initialize State
const initState = {
  visualData: [],
}

const visualDataReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_vISUALDATA':
      return {
        ...state,
        visualData: [...state.visualData, action.payload],
      }
    default:
      return state
  }
}

export default visualDataReducer
