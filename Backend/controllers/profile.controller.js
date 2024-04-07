import { Course } from "../models/course.model.js";
import { CoursePorgress } from "../models/courseProgress.model.js"; 
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {Profile} from '../models/profile.model.js'



const updateProfile = async (req, res) => {
	try {
		const { dateOfBirth = "", about = "", contactNumber } = req.body;
		const id = req.user.id;

		// Find the profile by id
		const userDetails = await User.findById(id);

        // update details in profile 
		const profile = await Profile.findByIdAndUpdate(userDetails.additionalDetails,{
            dateOfBirth = dateOfBirth;
            about = about;
            contactNumber = contactNumber;
        });

		return res.status(200).json({
			success: true,
			message: "Profile updated successfully",
			profile,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
	}
};

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

const getUserAllDetails = async (req, res) => {
	try {
		const id = req.user.id;

        // get all details of user
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);

		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

const  updateProfilePicture = async (req, res) => {
    try {
        // fecth image 
      const image = req.files.profilePicture
      const userId = req.user.id


      // upload profile image on clodinary
      const savedImg = await uploadOnCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)

      // update in db
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: savedImg.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
// const getEnrolledCourses = async (req, res) => {
// 	try {
// 	  const userId = req.user.id
// 	  let userDetails = await User.findOne({
// 		_id: userId,
// 	  })
// 		.populate({
// 		  path: "courses",
// 		  populate: {
// 			path: "courseContent",
// 			populate: {
// 			  path: "subSection",
// 			},
// 		  },
// 		})
// 		.exec()

// 	  userDetails = userDetails.toObject()
// 	  var SubsectionLength = 0
// 	  for (var i = 0; i < userDetails.courses.length; i++) {
// 		let totalDurationInSeconds = 0
// 		SubsectionLength = 0
// 		for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
// 		  totalDurationInSeconds += userDetails.courses[i].courseContent[
// 			j
// 		  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
// 		  userDetails.courses[i].totalDuration = convertSecondsToDuration(
// 			totalDurationInSeconds
// 		  )
// 		  SubsectionLength +=
// 			userDetails.courses[i].courseContent[j].subSection.length
// 		}
// 		let courseProgressCount = await CourseProgress.findOne({
// 		  courseID: userDetails.courses[i]._id,
// 		  userId: userId,
// 		})
// 		courseProgressCount = courseProgressCount?.completedVideos.length
// 		if (SubsectionLength === 0) {
// 		  userDetails.courses[i].progressPercentage = 100
// 		} else {
// 		  // To make it up to 2 decimal point
// 		  const multiplier = Math.pow(10, 2)
// 		  userDetails.courses[i].progressPercentage =
// 			Math.round(
// 			  (courseProgressCount / SubsectionLength) * 100 * multiplier
// 			) / multiplier
// 		}
// 	  }
  
// 	  if (!userDetails) {
// 		return res.status(400).json({
// 		  success: false,
// 		  message: `Could not find user with id: ${userDetails}`,
// 		})
// 	  }
// 	  return res.status(200).json({
// 		success: true,
// 		data: userDetails.courses,
// 	  })
// 	} catch (error) {
// 	  return res.status(500).json({
// 		success: false,
// 		message: error.message,
// 	  })
// 	}
//   }

// const instructorDashboard = async(req, res) => {
// 	try{
// 		const courseDetails = await Course.find({instructor:req.user.id});

// 		const courseData  = courseDetails.map((course)=> {
// 			const totalStudentsEnrolled = course.studentsEnrolled.length
// 			const totalAmountGenerated = totalStudentsEnrolled * course.price

// 			//create an new object with the additional fields
// 			const courseDataWithStats = {
// 				_id: course._id,
// 				courseName: course.courseName,
// 				courseDescription: course.courseDescription,
// 				totalStudentsEnrolled,
// 				totalAmountGenerated,
// 			}
// 			return courseDataWithStats
// 		})

// 		res.status(200).json({courses:courseData});

// 	}
// 	catch(error) {
// 		console.error(error);
// 		res.status(500).json({message:"Internal Server Error"});
// 	}
// }



export {updateProfile, updateProfilePicture, deleteAccount, getUserAllDetails}