import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"
import cartReducer from '../slices/cartSlice';
import courseReducer from '../slices/courseSlice'
import studentCourseReducer from '../slices/studentCourseSlice'
import profileReducer from '../slices/profileSlice'

const allReducers  = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    course:courseReducer,
    studentCourse:studentCourseReducer,
    profile: profileReducer
})

export default allReducers