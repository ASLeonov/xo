import {combineReducers} from 'redux'
import {scoresReducer} from './scores'

export const reducer = combineReducers({
  scores: scoresReducer,
})