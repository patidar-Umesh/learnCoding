import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
    },

    accountType: {
      type: String,
      required: true,
      enum: ["Student", "Instructor", "Admin"],
    },

    additionalDetails: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "Profile",
    },

    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course"
      },
    ],

    token: {
      type: String,
    },

    resetPasswordExpires: {
      type: Date,
    },

    courseProgress: [
        {
            type: Schema.Types.ObjectId,
            ref: "CourseProgress",
        },
    ],
  },
  { timestamps: true }
);


export const User = mongoose.model('User', userSchema)