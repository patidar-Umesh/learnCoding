import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'Course'
  },

  });




export const Tag = mongoose.model('Tags', tagSchema)