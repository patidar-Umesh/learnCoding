import mongoose from "mongoose";

const subSectionSchema = new mongoose.Schema({

  title: {
    type: String,
    reuired: true
  },

  timeDuration: {
    type: String,
    reuired: true
  },

  description: {
    type: String,
    reuired: true
  },

  videoUrl: {
    type: String,
    reuired: true
  },



});




export const SubSection = mongoose.model('SubSection', subSectionSchema)