//Reducer for argumentRow information Initialize State
const initState = {
  visualData: [],
  index: -1,
  total_index: -1,
  filterVisualData: {},
}

const visualDataReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_VISUALDATA':
      return {
        ...state,
        visualData: [...state.visualData, action.payload],
        index: state.index + 1,
        total_index: state.index + 1,
        filterVisualData: action.payload,
      }

    case 'INCREMENT_INDEX':
      return {
        ...state,
        filterVisualData: state.visualData[state.index + 1],
        index: state.index + 1,
      }
    case 'DECREMENT_INDEX':
      return {
        ...state,
        filterVisualData: state.visualData[state.index - 1],
        index: state.index - 1,
      }
    default:
      return state
  }
}

export default visualDataReducer
