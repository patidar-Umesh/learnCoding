import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js"
import cartReducer from '../slices/cartSlice.js';
import courseReducer from '../slices/courseSlice.js'
import studentCourseReducer from '../slices/studentCourseSlice.js'
import profileReducer from '../slices/profileSlice.js'

const allReducers  = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    course:courseReducer,
    studentCourse:studentCourseReducer,
    profile: profileReducer
})

export default allReducers