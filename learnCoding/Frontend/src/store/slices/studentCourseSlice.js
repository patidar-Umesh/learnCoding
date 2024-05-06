import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  courseSectionData: [],
  courseEntireData: [],
  completedLectures: [],
  totalNoOfLectures: 0,
}

const studentCourseSlice = createSlice({
  name: "studentCourse",
  initialState,

  reducers: {
    setCourseSectionData: (state, action) => {
      state.courseSectionData = action.payload
    },

    setEntireCourseData: (state, action) => {
      state.courseEntireData = action.payload
    },

    setTotalNoOfLectures: (state, action) => {
      state.totalNoOfLectures = action.payload
    },

    setCompletedLectures: (state, action) => {
      state.completedLectures = action.payload
    },
    
    updateCompletedLectures: (state, action) => {
      state.completedLectures = [...state.completedLectures, action.payload]
    },
  },
})

export const {
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
  setCompletedLectures,
  updateCompletedLectures,
} = studentCourseSlice.actions

export default studentCourseSlice.reducer