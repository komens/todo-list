import { createStore, combineReducers } from 'redux'

import homeStore from "./home"

const reducers = combineReducers({
    home: homeStore
})

export default createStore(reducers)