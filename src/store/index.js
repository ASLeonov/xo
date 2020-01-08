import {createStore} from 'redux'
import {reducer} from './reducers'

export const store = createStore(reducer)

// ONLY FOR DEV
window.store = store