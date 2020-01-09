import {combineReducers} from 'redux'
import {scoresReducer} from './scores'
import {resultsReducer} from './results'

export const reducer = combineReducers({
  scores: scoresReducer,
  results: resultsReducer,
})