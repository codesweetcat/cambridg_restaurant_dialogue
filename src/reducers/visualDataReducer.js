//Reducer for argumentRow information Initialize State
const initState = {
  visualData: [],
  index: -1,
  total_index: -1,
  filterVisualData: {
    Task: {
      action_labels: ['None', 'Offer', 'Answer', 'Request'],
      action_probs: [0, 0, 0, 0],
      agent_select: '',
      eval_select: '',
    },
    'Auto-feedback': {
      action_labels: ['None', 'AutoNegative', 'Confirm', 'ImplicitConfirm'],
      action_probs: [0, 0, 0, 0],
      agent_select: '',
      eval_select: '',
    },
    SOM: {
      action_labels: ['None', 'AcceptThanking', 'Confirm'],
      action_probs: [0, 0, 0, 0],
      agent_select: '',
      eval_select: '',
    },
    Evaluation: {
      action_labels: [
        ['', ''],
        ['    SOM1'],
        ['   Auto-feedback'],
        ['    Auto-feedback + SOM'],
        ['   Task'],
        ['   Task + SOM'],
        ['    Task + Auto-feedback'],
        ['Task + Auto-feedback + SOM'],
      ],
      action_probs: [0, 0, 0, 0],
      agent_select: '',
      eval_select: '',
    },
  },
}

const visualDataReducer = (state = initState, action) => {
  switch (action.type) {
    case 'ADD_VISUALDATA':
      return {
        ...state,
        visualData: [...state.visualData, action.payload],
        index: state.index + 1,
        total_index: state.total_index + 1,
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
