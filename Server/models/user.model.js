import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
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
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  contactNumber: {
    type: Number,
    required: true,
    trim: true
  },
  
  gender: {
    type: String,
    required: true
  },

  dateOfBirth: {
    type: String,
    required: true,
  },

  about: {
    type: String,
    trim: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },

  confirmPassword:{
    type: String,
    required : true,
    trim: true
  },

  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },

  additionalInfo: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
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

  coursesProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'CourseProgress'
    }
  ],
});




export const User = mongoose.model('User', userSchema)