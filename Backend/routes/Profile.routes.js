import {Router} from 'express';
import { verifyJWT, isInstructor }  from "../middlewares/auth.middleware.js"
import {deleteAccount, updateProfile, getUserAllDetails, updateProfilePicture} from '../controllers/profile.controller.js';

const router = Router()

// Delete user Account
router.delete("/deleteProfile", verifyJWT, deleteAccount)

// update profile
router.put("/updateProfile", verifyJWT, updateProfile)

// get all user details
router.get("/getUserDetails", verifyJWT, getUserAllDetails)

// update profile pic
router.put("/updateDisplayPicture", verifyJWT, updateProfilePicture)

// Get Enrolled Courses
// router.get("/getEnrolledCourses", verifyJWT, getEnrolledCourses)
// router.get("/instructorDashboard", verifyJWT, isInstructor, instructorDashboard)

export default router