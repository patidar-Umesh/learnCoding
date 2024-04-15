import mongoose,{Schema} from "mongoose";

const courseSchema = new Schema(
  {
    courseTitle: {
      type: String,
      required: true,
      trim: true,
    },

    courseDescription: {
      type: String,
      requied: true,
      trim: true,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      // requied: true,
    },

    whatYouWillLearn: {
      type: String,
      required: true,
      trim: true,
    },

    courseContent: [
      {
        type: Schema.Types.ObjectId,
        ref: "Section",
      },
    ],

    ratingAndReview: [
      {
        type: Schema.Types.ObjectId,
        ref: "RatingAndReview",
      },
    ],

    price: {
      type: Number,
      requied: true,
    },

    image: {
      type: String,
      // required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },

    tag: {
      type: [String],
      required: true,
    },

    studentsEnrolled: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],

    instructions: {
      type: [String],
    },

    status: {
      type: String,
      enum: ["Draft", "Published"],
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
