import visualDataReducer from './visualDataReducer'
import { combineReducers } from 'redux'

//Combine all the sub reducers
const rootReducer = combineReducers({
  // characters: characterReducer,
  visualdata: visualDataReducer,
})

export default rootReducer
