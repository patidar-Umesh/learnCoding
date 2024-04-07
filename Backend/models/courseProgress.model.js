import mongoose from "mongoose";

const coursePorgressSchema = new mongoose.Schema({
    
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },

  completedVideos: [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'SubSection'
    },
  ],
},
{timestamps: true});

export const CoursePorgress = mongoose.model(
  "courseProgress",
  coursePorgressSchema
);
