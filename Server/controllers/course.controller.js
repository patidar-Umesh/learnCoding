import { Course } from "../models/course.model.js";
import { Tag } from "../models/tag.model.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create course
const creatCourse = async (req, res) => {
  try {
    // get all course details from body
    const { courseName, courseDescription, whatYouWillLearn, price, tag } =
      req.body;
    const { thumbnail } = req.files.file;

    // validate fields
    if (
      (!courseName && !courseDescription) ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !thumbnail
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields is required",
      });
    }

    // get instructor  details
    const instructorId = req.user.id;
    const instructorDetails = await User.findById(instructorId);

    console.log(`Instructor is ${instructorDetails.firstName}`);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // check tag in db
    const tagsInfo = await Tag.findOne(tag);
    console.log(`Tag  is ${tagsInfo}`);

    if (!tagsInfo) {
      return res.status(404).json({
        success: false,
        message: "tag is invalid",
      });
    }

    // upload image/thumbnail on cloudinary
    const uploadedImageInfo = await uploadOnCloudinary(thumbnail, process.env.CLOUDINARY_IMAGE_FOLDER);
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
      tag: tagsInfo._id,
      instructor: instructorDetails._id,
      thumbnail: uploadedImageInfo.secure_url,
    });

    // save course id in user schema
    const user = await User.findByIdAndUpdate({_id: instructorDetails._id}, 
        {
            $push:{courses: course._id}
        },
        {new: true}
    )
    console.log(`created course id is ${user.courses}`)


    // return 
    console.log(`course added successfully ${course}`);
    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      courseData: course
    });

  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};



// get all courses
const allCourses = async (req, res) => {
  try {
    // fetch courses
    const courses = await Course.find()
    console.log(`all courses is ${courses}`)

    return res.status(200).json({
        success: true,
        message: "all courses fetch successfully",
      });
    
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
}
