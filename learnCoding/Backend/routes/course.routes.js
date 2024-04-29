import { Router } from "express";
import {
  creatCourse,
  allCourses,
  getCourseDetails,
  getInstructorCourses,
  deleteCourse,
  editCourse,
  getFullCourseDetails,
} from "../controllers/course.controller.js";
import {
  createSection,
  updateSection,
  deleteSection,
} from "../controllers/section.controller.js";
import {
  createSubSection,
  deleteSubSection,
  updateSubSection,
} from "../controllers/subSection.controller.js";
import {
  isAdmin,
  isInstructor,
  isStudent,
  verifyJWT,
} from "../middlewares/auth.middleware.js";
import {
  allRatingReview,
  averageRating,
  createRating,
} from "../controllers/ratingAndRevies.controller.js";
import {
  allCategory,
  createCategory,
  categoryCourses
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {updateCourseProgress} from '../controllers/courseProgress.controller.js'


const router = Router();



//                 coures routes               //

// create course by instructor
router.post("/create-course",  verifyJWT, isInstructor, creatCourse);

// edit course
router.put('/edit-course', verifyJWT, isInstructor, editCourse)


// get all courses
router.get("/all-courses", allCourses); 

// get course by id
router.post("/get-course-details", getCourseDetails);

// get full details by instructor
router.post("/get-full-course-details", verifyJWT,  getFullCourseDetails);


// get course by instructor
router.get("/get-instructor-courses", verifyJWT, isInstructor, getInstructorCourses)


// delete course by id
router.delete("/delete-course", verifyJWT, isInstructor, deleteCourse)





//                Section routes                          //

// create section by instructor
router.post("/create-section", verifyJWT, isInstructor, createSection);

// upadate section
router.put("/update-section", verifyJWT, isInstructor, updateSection);

// delete section
router.delete("/delete-section", verifyJWT, isInstructor, deleteSection);




//               Sub Section routes                          //

// create sub section
router.post("/create-subSection", verifyJWT, isInstructor, createSubSection);

// update sub section
router.put("/update-subSection", verifyJWT, isInstructor, updateSubSection);

// delete sub section
router.delete("/delete-subSection", verifyJWT, isInstructor, deleteSubSection);




//          rating and review routes                          //

// create rating and review
router.post("/create-rating-review", verifyJWT, isStudent, createRating);

// get average rating
router.get("/average-rating", averageRating);

// all rating and reviews
router.get("/all-rating", allRatingReview);



//         category  routes for Admin only                         //

// create category
router.post("/create-category", verifyJWT, isAdmin, createCategory);

// show all category list
router.get("/get-all-category", allCategory);

// show course by category
router.post("/category-courses", categoryCourses);

// completed course
router.post("/update-courseProgress", verifyJWT, isStudent, updateCourseProgress);



export default router;
