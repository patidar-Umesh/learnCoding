import { instance } from "../utils/razorpay.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";
import mailSender from "../utils/nodemailer.js";
import mongoose from "mongoose";
import crypto, { sign } from "crypto";

// capture payment function

const capturePayment = async (req, res) => {
  try {
    // fetch course id and user id
    const { courseId } = req.body;
    const userId = req.user.userId;

    if (!courseId) {
      return res.status(404).json({
        success: false,
        message: "please provide valid course id",
      });
    }

    // validation course by id
    const course = await Course.findById(courseId);
    console.log(`course information is ${course}`);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // convert userid into object id
    const uId = mongoose.Types.ObjectId(userId);
    console.log(`converted user id ${uId}`);

    // chech user already by course or not
    if (course.studentsEnrolled.includes(uId)) {
      return res.status(200).json({
        success: true,
        message: "Studnet is already enrolled",
      });
    }

    // order create
    const amount = course.price;
    const currency = "INR";

    // create options
    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course._id,
        userId: userId,
      },
    };

    try {
      const paymetnResponse = instance.orders.create(options);
      console.log(`payment result is ${paymetnResponse}`);

      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymetnResponse.id,
        currency: paymetnResponse.currency,
        amount: paymetnResponse.amount,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "could not process payment",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// verify signature
const verifySignature = async (req, res) => {
  const webHookSecret = "1234567";

  const signature = req.headers["x-razorypay-signature"];
  console.log(`received razorpay signature is ${signature}`);

  // convert our secret into hashmac
  const encryptedSecret = crypto.createHmac("sha256", webHookSecret);
  console.log(`encrypted secret is ${encryptedSecret}`);

  // converted into string
  encryptedSecret.update(JSON.stringify(req.body));
  console.log(encryptedSecret);

  // digest
  const digest = encryptedSecret.digest("hex");

  // compare razorpay sing with converted secret

  if (digest === signature) {
    console.log(`succesfully matched both key`);

    try {
      // get courseId and userId from razorpay notes
      const { courseId, userId } = req.body.payload.payment.entirty.notes;
      console.log(`courseid is ${courseId} and userid is ${userId}`);

      // add user id into course enrolledStudent
      const enrolledCourses = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        { new: true }
      );

      if (!enrolledCourses) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }

      console.log(` enrolled course is ${enrolledCourses}`);

      //   add course id into user details
      const enrolledStudent = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
          },
        },
        { new: true }
      );

      // sendmail 
      if (enrolledStudent) {
        const sendMail = await mailSender(
          enrolledStudent.email,
          "Successfully buy the course",
          "congrates"
        );

        return res.status(200).json({
          success: true,
          message: "successfully enrolled in course",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "somthing went wrong",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
};

export { capturePayment, verifySignature };
