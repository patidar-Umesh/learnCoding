import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { CoursePorgress } from "../models/courseProgress.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Section } from "../models/section.model.js";
import { SubSection } from "../models/subSection.model.js";
import convertSecondsToDuration from "../utils/secToDuration.js";

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

    console.log(
      courseTitle,
      courseDescription,
      whatYouWillLearn,
      tag,
      price,
      category,
      instructions,
      status
    );
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

    console.log("uploaded image is", uploadedImageInfo);
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
      category: categoryInfo._id,
      status,
      instructor: instructorDetails._id,
      image: uploadedImageInfo.secure_url,
    });

    // insert course id in category collection
    categoryInfo.courses = course._id
    await categoryInfo.save()

    
    console.log("created course", course);

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
    const { courseId, courseTitle, whatYouWillLearn,  courseDescription, price, category,instructions  } = req.body;
    const updates = req.body;

    // console.log("edit course",courseId, courseTitle, whatYouWillLearn,  courseDescription, price, category,instructions );
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        succes: false,
        error: "Course not found",
      });
    }

    if (req.files) {
      console.log("image", req.files.image);
      const image = req.files.image;

      const uploadedImage = await uploadOnCloudinary(
        image,
        process.env.CLOUDINARY_IMAGE_FOLDER
      );
      course.image = uploadedImage?.secure_url;
    }

    for (const key in updates) {
      // console.log('keys', key);
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key]);
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

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
      .exec();

   return res.json({
      success: true,
      message: "Course Updated Successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

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
    const { courseId } = req.body

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
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

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

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


// get full details of course
const getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log("course id ", courseId);

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
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    let courseProgressCount = await CoursePorgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    // console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {courseDetails},
      totalDuration,
      completedVideos: courseProgressCount?.completedVideos
        ? courseProgressCount?.completedVideos
        : [],
      }
    );
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


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


// delete course
const deleteCourse = async (req, res) => {
  try {
    // fetch course id
    const { courseId } = req.body;

    const course = await Course.findById({ _id: courseId });

    const sections = course.courseContent;

    for (const sectionId of sections) {
      const section = await Section.findById(sectionId);
      if (section) {
        const subSections = section.subSection;

        for (const subSectionId of subSections) {
          const subSection = await SubSection.findById(subSectionId);

          // delete video from cloudinary
          const deletedVideoFile = await deleteFromCloudinary(
            subSection?.videoUrl
          );

          if (deletedVideoFile?.result !== "ok") {
            console.log("Getting error from cloudinary video deletion");
            return res.status(404).json({
              success: false,
              message: "somthing went wrong when deleted video from coudinary",
            });
          }

          console.log(
            " Video Deleted succssfully from cloudinary",
            deletedVideoFile
          );

          // delete subsections
          await SubSection.findByIdAndDelete({_id: subSectionId});
        }
      }
    }

    // delete img file from cloudinary
    console.log('image', course.image);
    const deletedImageFile = await deleteFromCloudinary(course?.image);

    if (deletedImageFile?.result !== "ok") {
      console.log("Getting error from cloudinary image");
      return res.status(404).json({
        success: false,
        message: "somthing went wrong when deleted image from coudinary",
      });
    }

    console.log(
      " Image deleted successfully from cloudinary",
      deletedImageFile
    );

    // delete section
    await Section.findByIdAndDelete({ _id: course.courseContent });

    // delete  course
    const deletedCourse = await Course.findByIdAndDelete({ _id: courseId });

    // delete course id from user
    await User.findByIdAndUpdate(
      { _id: course.instructor },
      {
        $pull: { courses: courseId },
      },
      { new: true }
    );

    console.log("course deleted successfully");
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
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

export {
  creatCourse,
  allCourses,
  getCourseDetails,
  getFullCourseDetails,
  getInstructorCourses,
  deleteCourse,
  editCourse,
};
