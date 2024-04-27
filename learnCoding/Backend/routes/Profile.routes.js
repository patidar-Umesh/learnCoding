import {Router} from 'express';
import { verifyJWT, isInstructor }  from "../middlewares/auth.middleware.js"
import {deleteAccount, updateProfile, getUserAllDetails, updateProfilePicture, getEnrolledCourses} from '../controllers/profile.controller.js';

const router = Router()

// Delete user Account
router.delete("/deleteProfile", verifyJWT, deleteAccount)

// update profile
router.put("/update-profile", verifyJWT, updateProfile)

// get all user details
router.get("/getUserDetails", verifyJWT, getUserAllDetails)

// update profile pic
router.put("/update-display-picture", verifyJWT, updateProfilePicture)

// Get Enrolled Courses
router.get("/get-enrolled-courses", verifyJWT, getEnrolledCourses)
// router.get("/instructorDashboard", verifyJWT, isInstructor, instructorDashboard)

export default router