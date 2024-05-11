
const BASE_URL = import.meta.env.VITE_BACKEND_URL
// console.log('base url', BASE_URL) 

// **************************************** API ALL ENDPOINTS  **************************************** //

// auth endporint
export const endpoints = {
  SENDOTP_API: BASE_URL + "/user/sendotp",
  SIGNUP_API: BASE_URL + "/user/signUp",
  LOGIN_API: BASE_URL + "/user/login",
  RESETPASSTOKEN_API: BASE_URL + "/user/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/user/reset-password",
}

// profile 
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/get-user-details",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/get-enrolled-courses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructor-dashboard",
}

// student 
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifySignature",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// course 
export const courseEndpoints = {
    // course
  GET_ALL_COURSE_API: BASE_URL + "/course/all-courses",
  COURSE_DETAILS_API: BASE_URL + "/course/get-course-details",
  EDIT_COURSE_API: BASE_URL + "/course/edit-course",
  CREATE_COURSE_API: BASE_URL + "/course/create-course",
  DELETE_COURSE_API: BASE_URL + "/course/delete-course",
  COURSE_CATEGORIES_API: BASE_URL + "/course/get-all-category",


  // sections
  CREATE_SECTION_API: BASE_URL + "/course/create-section",
  DELETE_SECTION_API: BASE_URL + "/course/delete-section",
  UPDATE_SECTION_API: BASE_URL + "/course/update-section",

  // sub section
  CREATE_SUBSECTION_API: BASE_URL + "/course/create-subSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/delete-subSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/update-subSection",

  // instructor all courses
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/get-instructor-courses",

  // get full details of course 
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/get-full-course-details",

    // update course progress
  LECTURE_COMPLETION_API: BASE_URL + "/course/update-courseProgress",

// rating and reviews

REVIEWS_DETAILS_API: BASE_URL + "/course/all-rating",
CREATE_RATING_API: BASE_URL + "/course/create-rating-review",


}


// category page
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/category-courses",
}

// contact us api
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/contact",
}

// dashboard setting 
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/update-display-picture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/update-profile",
  CHANGE_PASSWORD_API: BASE_URL + "/user/change-password",
  DELETE_ACCOUNT_API: BASE_URL + "/profile//delete-account",
}