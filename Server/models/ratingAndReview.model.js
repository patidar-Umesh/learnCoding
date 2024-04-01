import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },

  rating: {
    type: Number,
    required: true
  },

  review: {
    type: String,
    required: true
  },


  });




export const RatingAndReview = mongoose.model('RatingAndReviews', ratingAndReviewSchema)