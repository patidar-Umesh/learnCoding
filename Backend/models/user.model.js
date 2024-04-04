import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    contactNumber: {
      type: Number,
      required: true,
      trim: true,
    },

    gender: {
      type: String,
      trim: true,
      required: true,
    },

    dateOfBirth: {
      type: String,
      required: true,
    },

    // about: {
    //   type: String,
    //   trim: true,
    // },

    password: {
      type: String,
      required: true,
      trim: true,
    },

    accountType: {
      type: String,
      enum: ["Admin", "Student", "Instructor"],
      required: true,
    },

    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],

    image: {
      type: String,
      // required: true,
    },

    token: {
      type: String,
      expires: 5 * 60
    },

    forgotPasswordExpire: {
      type: Date,
    },

    coursesProgress: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseProgress",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
