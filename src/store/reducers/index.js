import {combineReducers} from 'redux'
import {scoresReducer} from './scores'
import {resultsReducer} from './results'
import {minScoreReducer} from './minScore'

export const reducer = combineReducers({
  scores: scoresReducer,
  results: resultsReducer,
  minScore: minScoreReducer,
})