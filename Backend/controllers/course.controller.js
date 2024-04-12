import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import {  uploadOnCloudinary } from "../utils/cloudinary.js";

// create course
const creatCourse = async (req, res) => {
  try {
    // get all course details from body
    let {
      courseTitle,
      courseDescription,
      whatYouWillLearn,
      tag,
      price,
      category,
      instructions,
      status,
    } = req.body;

    let image = req.files.image;

    // validate fields
    if (
      (!courseTitle && !courseDescription) ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !image ||
      !tag
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields is required",
      });
    }

    if (!status || status === undefined) {
      status = "Draft";
    }
    // get instructor  details
    let instructorId = req.user.id;
    instructorId = new mongoose.Types.ObjectId(instructorId);

    const instructorDetails = await User.findById({ _id: instructorId });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // check tag in db
    const categoryInfo = await Category.findOne({ _id: category });

    if (!categoryInfo) {
      return res.status(404).json({
        success: false,
        message: "category is invalid",
      });
    }

    // upload image/thumbnail on cloudinary
    const uploadedImageInfo = await uploadOnCloudinary(
      image,
      process.env.CLOUDINARY_IMAGE_FOLDER
    );


    // console.log('image details is', uploadedImageInfo);

    if (!uploadedImageInfo) {
      return res.status(400).json({
        success: false,
        message: "image not upload on cloudinary",
      });
    }

    // save data in db
    const course = await Course.create({
      courseTitle,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      instructions,
      status,
      instructor: instructorDetails._id,
      image: uploadedImageInfo.secure_url,
    });


    console.log('created course', course);
    


    // save course id in user schema
    const user = await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: course._id },
      },
      { new: true }
    );

    // return
    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      data: course,
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing went wrong",
    });
  }
};



// edit course 
const editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body

    console.log('edit course', req.body);
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json(
        { 
          succes: false,
          error: "Course not found" 
      })
    }

    if (req.files) {
      console.log("thumbnail update", req.files.image)
      const image = req.files.image

      const thumbnailImage = await uploadOnCloudinary(
        image,
        process.env.CLOUDINARY_IMAGE_FOLDER
      )
      course.image = thumbnailImage.secure_url
    }

    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReview")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}

// get all courses
const allCourses = async (req, res) => {
  try {
    // fetch courses
    const courses = await Course.find();
    // console.log(`all courses is ${courses}`);

    return res.status(200).json({
      success: true,
      data: courses,
      message: "all courses fetch successfully",
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};

//get course Details by  course id
const getCourseDetails = async (req, res) => {
  try {
    //get course id
    const {courseId} = req.body;
    console.log("course id is ", courseId);

    //get course details
    const courseDetails = await Course.findById({
      _id: new mongoose.Types.ObjectId(courseId),
    })
      .populate({
        path: "instructor",
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // console.log("course is", courseDetails);

    //validation

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    // res
    return res.status(200).json({
      success: true,
      message: "fatched course details successfully",
      data: courseDetails,
    });
  } catch (error) {
    console.log(`Somthing went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "Somthing went wrong in getting course details",
    });
  }
};

// get full details of course 
const getFullCourseDetails = async (req, res) => {
  try {
    const {courseId} = req.body
    console.log('course id auth', req.body);

    const userId = req.user.id

    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    // let courseProgressCount = await CourseProgress.findOne({
    //   courseID: courseId,
    //   userId: userId,
    // })

    // console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    // let totalDurationInSeconds = 0
    // courseDetails.courseContent.forEach((content) => {
    //   content.subSection.forEach((subSection) => {
    //     const timeDurationInSeconds = parseInt(subSection.timeDuration)
    //     totalDurationInSeconds += timeDurationInSeconds
    //   })
    // })

    // const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: 
        courseDetails
        // totalDuration,
        // completedVideos: courseProgressCount?.completedVideos
        //   ? courseProgressCount?.completedVideos
        //   : [],
      // },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// get course by instructor
const getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id;

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 });

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    // fetch course id
    const { courseId } = req.body;

    // get img url from db 
    const course  = await Course.findById({_id: courseId})


    // delete img file from clodinary
    const deletedFile = await deleteFromCloudinary(course.image)
    console.log('delete file is', deletedFile);

    // check course in db
    const deletedCourse = await Course.findByIdAndDelete({_id: courseId},{
      new: true
    })

    // delete course id from user 
    await User.findByIdAndUpdate(
      { _id: course.instructor },
      {
        $pull: { courses: courseId },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};




export { creatCourse, allCourses, getCourseDetails, getFullCourseDetails, getInstructorCourses, deleteCourse, editCourse };
