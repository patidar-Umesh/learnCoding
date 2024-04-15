import {configureStore} from '@reduxjs/toolkit'
import allReducers from './combineReducer/index.js'

const store = configureStore({
  reducer: allReducers,
})

export default store


