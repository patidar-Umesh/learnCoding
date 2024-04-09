import { Router } from 'express'
import {creatCourse, allCourses, getCourseDetails} from '../controllers/course.controller.js'
import {createSection, updateSection, deleteSection} from '../controllers/section.controller.js'
import {createSubSection, deleteSubSection, updateSubSection} from '../controllers/subSection.controller.js'
import { isAdmin, isInstructor, isStudent, verifyJWT } from '../middlewares/auth.middleware.js'
import { allRatingReview, averageRating, createRating } from '../controllers/ratingAndRevies.controller.js'
import { allCategory, createCategory } from '../controllers/category.controller.js'

const router = Router()

                              //                 coures routes               // 

// create course by instructor
router.post('/create-course', verifyJWT, isInstructor, creatCourse)

// get all courses 
router.get('/all-courses',  allCourses)

// get course by id 
router.post('/get-course-details', getCourseDetails)


                  //                Section routes                          //

// create section by instructor
router.post('/create-section', verifyJWT, isInstructor, createSection)

// upadate section
router.put('/update-section', verifyJWT, isInstructor, updateSection)

// delete section
router.delete('/delete-section', verifyJWT, isInstructor, deleteSection)


                  //               Sub Section routes                          //

// create sub section
router.post('/create-subSection', verifyJWT, isInstructor, createSubSection)  

// update sub section
router.put('/update-subSection', verifyJWT, isInstructor, updateSubSection)   

// delete sub section
router.delete('/delete-subSection', verifyJWT, isInstructor, deleteSubSection)   



                  //          rating and review routes                          //

// create rating and review
router.post('/create-rating-review', verifyJWT, isStudent, createRating)

// get average rating
router.get('/average-rating', averageRating)


// all rating and reviews
router.get('/all-rating' , allRatingReview)


                  //         category  routes for Admin only                         // 

// create category
router.post('/create-category', verifyJWT, isAdmin ,createCategory)

// show all category list
router.get('/get-all-category',  allCategory)






export default router







