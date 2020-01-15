import {createStore, applyMiddleware} from 'redux'
import {reducer} from './reducers'
import apiGet from './middlewares/apiGet'

export const store = createStore(reducer, applyMiddleware(apiGet))

// ONLY FOR DEV
// window.store = store