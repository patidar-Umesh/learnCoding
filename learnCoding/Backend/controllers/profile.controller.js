import { Course } from "../models/course.model.js";
import { CourseProgress } from "../models/courseProgress.model.js";
import { User } from "../models/user.model.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";
import { Profile } from "../models/profile.model.js";
import convertSecondsToDuration from "../utils/secToDuration.js";

// update user profile
const updateProfile = async (req, res) => {
  try {
    const { dateOfBirth, about, contactNumber, gender, lastName, firstName } =
      req.body;
    const id = req.user.id;

    // console.log("profile ", dateOfBirth, about, contactNumber, gender);

    // Find the profile by id
    const userDetails = await User.findByIdAndUpdate(id, {
      firstName: firstName,
      lastName: lastName,
    })
      .select("-password")
      .populate("additionalDetails");

    // update details in profile additionalDetails
    const profile = await Profile.findByIdAndUpdate(
      { _id: userDetails.additionalDetails._id },
      {
        dateOfBirth: dateOfBirth,
        about: about,
        gender: gender,
        contactNumber: contactNumber,
      },
      { new: true }
    );

    // console.log('user is', userDetails);

    if (!profile) {
      return res.status(200).json({
        success: false,
        message: "No additioanl details available",
      });
    }

    console.log("user", userDetails);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// delete account
const deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    console.log("user id is ", req.user.id);

    const user = await User.findById({ _id: id });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // delete  Profile
    await Profile.findByIdAndDelete({ _id: user.additionalDetails });

    //  Delete User
    await User.findByIdAndDelete({ _id: id });

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "User Cannot be deleted successfully" });
  }
};

// get all user details
const getUserAllDetails = async (req, res) => {
  try {
    const id = req.user.id;

    // get all details of user
    const userDetails = await User.findById({ _id: id })
      .populate("additionalDetails")
      .exec();

    // console.log(userDetails);

    res.status(200).json({
      success: true,
      message: "User Data fetched successfully",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "somthing error when getting all details",
    });
  }
};

// update profile picture
const updateProfilePicture = async (req, res) => {
  try {
    // fecth image file
    const image = req.files.image;
    const userId = req.user.id;
    // console.log('image file is',image);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image is required before upload",
      });
    }

    // find id of user
    const user = await User.findById({ _id: userId });

    // delete before upload image
    const deletedImage = await deleteFromCloudinary(user?.image)
    // console.log('deleted image', deletedImage);

    if (deletedImage?.result !== 'ok') {
      return res.status(404).json({
        success: false,
        message: "Getting error from Cloudinary delete api",
      });
    }

    // upload profile image on clodinary
    const savedImg = await uploadOnCloudinary(image, process.env.FOLDER_NAME);

    
    if (savedImg?.result !== 'ok') {
      return res.status(404).json({
        success: false,
        message: "Getting error from Cloudinary upload api",
      });
    }

    //  update in user details
    user.image = savedImg?.secureUrl
    await user.save()

    // console.log('image is', user)

    return res.send({
      success: true,
      message: `Image Updated successfully`,
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get enrolled courses by student
const getEnrolledCourses = async (req, res) => {
  try {
    // get user id from login user
    const userId = req.user.id;

    // check user details
    let userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();

    // validate
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails._id}`,
      });
    }

    userDetails = userDetails.toObject();
    var subSectionLength = 0;

    // check courses
    for (let i = 0; i < userDetails?.courses?.length; i++) {
      subSectionLength += 0;
      let courseTotalDurationInSeconds = 0;

      // after checking course we check the courseCotent
      for (let j = 0; j < userDetails?.courses[i]?.courseContent?.length; j++) {
        subSectionLength +=
          userDetails?.courses[i]?.courseContent[j]?.subSection?.length;
        // console.log('total subsection', subSectionLength);

        courseTotalDurationInSeconds += userDetails?.courses[i]?.courseContent[
          j
        ]?.subSection?.reduce(
          (preValue, currValue) => preValue + parseInt(currValue.timeDuration),
          0
        );
        // console.log("duration in seconds", courseTotalDurationInSeconds);

        // save totalDuration in proper time formate
        userDetails.courses[i].totalDuration = convertSecondsToDuration(
          courseTotalDurationInSeconds
        );
      }

      // check course progress
      const courseProgress = await CourseProgress.findOne({
        courseId: userDetails?.courses[i]?._id,
        userId: userDetails?._id,
      });

      let totalCompletedVideos = courseProgress?.completedVideos?.length;
      //  console.log('Total completed Videos', totalCompletedVideos);

      if (subSectionLength === 0) {
        console.log("total subsection", subSectionLength);
        userDetails.courses[i].progressPercentage = 100;
      } else {
        const percentage = Math.round(
          (totalCompletedVideos / subSectionLength) * 100
        );
        console.log("percentage", percentage);
        userDetails.courses[i].progressPercentage = percentage;
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentsEnrolled * course.price;

      //create an new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentsEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });

    res.status(200).json({ courses: courseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  updateProfile,
  updateProfilePicture,
  deleteAccount,
  getUserAllDetails,
  getEnrolledCourses,
  instructorDashboard,
};
