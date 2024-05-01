import { instance } from "../utils/razorpay.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import mailSender from "../utils/nodemailer.js";
import mongoose from "mongoose";
import crypto, { sign } from "crypto";
import { courseEnrollmentEmail } from "../mailTemplates/courseEnrollmentEmail.js";
import { CourseProgress } from "../models/courseProgress.model.js";

// capture payment function
const capturePayment = async (req, res) => {
  try {
    const { courses } = req.body;
    const userId = req.user.id;
    console.log('user id', userId);

    if (courses?.length === 0) {
      return res.json({ success: false, message: "Please provide Course Id" });
    }

    let totalAmount = 0;

    for (const course_id of courses) {
      let course;
      try {
        console.log("course id", course_id);
        course = await Course.findById(course_id);
        // console.log("course is", course);

        if (!course) {
          return res
            .status(200)
            .json({ success: false, message: "Could not find the course" });
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (course.studentsEnrolled.includes(uid)) {
          console.log("totoalamount is 37", (totalAmount += course.price));
          return res
            .status(200)
            .json({ success: false, message: "Student is already Enrolled" });
        }

        totalAmount += course.price;
        console.log("totoalamount is 44", (totalAmount += course.price));
      } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error.message });
      }
    }

    const options = {
      amount: totalAmount * 100,
      currency: 'INR',
      receipt: Math.random(Date.now()).toString(),
    };

    console.log('57');
    const paymentResponse = await instance.orders.create(options);

    console.log('58');
    console.log("payment res", paymentResponse);

    return res.status(200).json({
      success: true,
      data: paymentResponse,
    });
  } catch (error) {
    console.log("capture payment error", error);
    return res.status(500).json({
      success: false,
      mesage: "Payment failed",
    });
  }
};

//verify the payment
const verifySignature = async (req, res) => {
  const razorpay_order_id = req.body?.razorpay_order_id;
  const razorpay_payment_id = req.body?.razorpay_payment_id;
  const razorpay_signature = req.body?.razorpay_signature;
  const courses = req.body?.courses;
  const userId = req.user.id;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({
      success: false,
      message: "Payment failed during validation",
    });
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    await enrolledStudents(courses, userId, res);

    //return res
    return res.status(200).json({ success: true, message: "Payment Verified" });
  }
  return res.status(200).json({ success: "false", message: "Payment Failed" });
};

const enrolledStudents = async (courses, userId, res) => {
  if (!courses || !userId) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Please Provide data for Courses or UserId",
      });
  }


  console.log('course and userid', courses, userId);



  for (const courseId of courses) {
    try {
      //find course and push the student id
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      console.log('enrolled course',enrolledCourse);

      if (!enrolledCourse) {
        return res
          .status(500)
          .json({ success: false, message: "Course not Found" });
      }

      const courseProgress = await CourseProgress.create({
        courseId: courseId,
        userId: userId,
        completedVideos: [],
      });

      // find user and push courseProgress id
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
            courseProgress: courseProgress._id,
          },
        },
        { new: true }
      );

      const emailResponse = await mailSender(
        enrolledStudents.email,
        `Successfully Enrolled into ${enrolledCourse.courseName}`,
        courseEnrollmentEmail(
          enrolledCourse.courseName,
          `${enrolledStudent.firstName}`
        )
      );
      console.log("Email Sent Successfully", emailResponse);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

const sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;

  const userId = req.user.id;

  if (!orderId || !paymentId || !amount || !userId) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all the fields" });
  }

  try {
    const enrolledStudent = await User.findById(userId);
    await mailSender(
      enrolledStudent.email,
      `Payment Recieved`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName}`,
        amount / 100,
        orderId,
        paymentId
      )
    );
  } catch (error) {
    console.log("error in sending mail", error);
    return res
      .status(500)
      .json({ success: false, message: "Could not send email" });
  }
};

// const capturePayment = async (req, res) => {
//   try {
//     // fetch course id and user id
//     const { courses } = req.body;
//     const userId = req.user.userId;
//     let totalAmount = 0;

//     for (const course_id of courses) {
//       let course;
//       try {
//         course = await Course.findById(course_id);
//         if (!course) {
//           return res.status(404).json({
//             success: false,
//             message: "Course not found",
//           });
//         }

//         // convert userid into object id
//         const uId = new mongoose.Types.ObjectId(userId);
//         console.log(`converted user id ${uId}`);

//         // chech user already by course or not
//         if (course.studentsEnrolled.includes(uId)) {
//           return res.status(200).json({
//             success: true,
//             message: "Studnet is already enrolled",
//           });
//         }

//         // add total amount
//         totalAmount += course.price;
//       } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//           success: false,
//           message: error.message,
//         });
//       }
//     }

//     // create options
//     const options = {
//       amount: totalAmount * 100,
//       currency: "INR",
//       receipt: Math.random(Date.now()).toString(),
//     };
    
//     // notes: {
//     //   // courseId: course._id,
//     //   userId: userId,
//     // },

//     try {
//       const paymetnResponse = instance.orders.create(options);
//       console.log(`payment result is ${paymetnResponse}`);

//       return res.status(200).json({
//         success: true,
//         data: paymetnResponse
//       });
//     } catch (error) {
//       return res.status(400).json({
//         success: false,
//         message: "could not process payment",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// // verify signature
// const verifySignature = async (req, res) => {
//   const razorypay_order_id = req.body.razorypay_order_id;
//   const razorypay_payment_id = req.body.razorypay_payment_id;
//   const razorypay_signautre = req.body.razorypay_signature;
//   const courses = req.body.courses;
//   const userId = req.body.userId;

// console.log('body', userId);

//   if (
//     !razorypay_order_id ||
//     !razorypay_payment_id ||
//     !razorypay_signautre ||
//     !courses ||
//     !userId
//   ) {
//     return res.status(500).json({
//       success: false,
//       message: "Could not make payment",
//     });
//   }

//   let body = razorypay_order_id + "|" + razorypay_payment_id;

//   // convert our secret into hashmac/ update / digest
//   const encryptedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   // const signature = req.headers["x-razorypay-signature"];
//   // console.log(`received razorpay signature is ${signature}`);

//   // compare razorpay singnature with converted signature
//   if (encryptedSignature === signature) {
//     console.log(`succesfully matched both key`);

//     try {
//       // enroll students in course
//       await enrolledStudents(courses, userId, res);

//       return res.status(200).json({
//         success: true,
//         message: "Successfully verified payment",
//       });
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: "somthing went wrong",
//       });
//     }
//   }
// };

// const enrolledStudents = async ({ courses, userId, res }) => {
//   try {
//     if (!courses || !userId) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide Courses and userId",
//       });
//     }

//     // add user id into course enrolledStudent
//     for (const courseId of courses) {
//       const enrolledCourses = await Course.findByIdAndUpdate(
//         courseId,
//         {
//           $push: {
//             studentsEnrolled: userId,
//           },
//         },
//         { new: true }
//       );

//       if (!enrolledCourses) {
//         return res.status(404).json({
//           success: false,
//           message: "Course not found",
//         });
//       }

//       console.log(` enrolled course is ${enrolledCourses}`);

//       //   add course id into user details
//       const enrolledStudent = await User.findByIdAndUpdate(
//         userId,
//         {
//           $push: {
//             courses: courseId,
//           },
//         },
//         { new: true }
//       );

//       // sendmail after successfully buy course
//       if (enrolledStudent) {
//         const sendMail = await mailSender(
//           enrolledStudent.email,
//           `Successfully Enrolled into ${enrolledCourses?.courseTitle}`,
//           courseEnrollmentEmail(
//             enrolledCourses?.courseTitle,
//             enrolledStudent?.firstName + enrolledStudent?.lastName
//           )
//         );
//       }
//     }
//   } catch (error) {
//     console.log('Student not enrolled any course');
//     return res.status(500).json({
//       success: false,
//       message: "Student not enrolled any course",
//     });
//   }
// };

export {
  capturePayment,
  verifySignature,
  enrolledStudents,
  sendPaymentSuccessEmail,
};
