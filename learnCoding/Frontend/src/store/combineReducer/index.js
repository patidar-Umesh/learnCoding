import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import cartReducer from '../slices/cartSlice';
import courseReducer from '../slices/courseSlice'
import viewCourseReducer from '../slices/viewCourseSlice'
import profileReducer from '../slices/profileSlice'

const allReducers  = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    course:courseReducer,
    viewCourse:viewCourseReducer,
    profile: profileReducer
})

export default allReducers