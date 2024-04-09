import mongoose from "mongoose";
import { Category } from "../models/category.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create course
const creatCourse = async (req, res) => {
  try {
    // get all course details from body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      tag,
      price,
      category,
      instructions,
      status,
    } = req.body;

    let image = req.files.image;
    console.log("image file ", image);
    console.log(
      "inst tag ",
      courseName,
      courseDescription,
      whatYouWillLearn,
      tag,
      price,
      category,
      instructions,
      status
    );

    // validate fields
    if (
      (!courseName && !courseDescription) ||
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
    console.log("id is ", instructorId);

    const instructorDetails = await User.findById({ _id: instructorId });

    console.log(`Instructor is ${instructorDetails.firstName}`);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // check tag in db
    const categoryInfo = await Category.findOne({ _id: category });
    console.log(`Category  is ${categoryInfo}`);

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
    console.log(`Uploaded image details is ${uploadedImageInfo}`);

    if (!uploadedImageInfo) {
      return res.status(400).json({
        success: false,
        message: "image not upload on cloudinary",
      });
    }

    // save data in db
    const course = await Course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      instructions,
      status,
      instructor: instructorDetails._id,
      image: uploadedImageInfo.secure_url,
    });

    // save course id in user schema
    const user = await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: course._id },
      },
      { new: true }
    );
    console.log(`created course id is ${user.courses}`);

    // return
    console.log(`course added successfully ${course}`);
    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      courseData: course,
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing went wrong",
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
    //get course id
    // const courseId = req.params.courseId;
    const {courseId} = req.body;

    console.log("course id is ", courseId);

    //get course details
    const courseDetails = await Course.findById({
      _id: courseId,
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

    console.log("course is", courseDetails);

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

export { creatCourse, allCourses, getCourseDetails };
