import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'

import homeStore from "./home"

const reducers = combineReducers({
    home: homeStore
})

export default createStore(reducers, applyMiddleware(thunk))