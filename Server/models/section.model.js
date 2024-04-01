import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
  },

  SubSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'SubSection'
    },
  ],

  description: {
    type: String,
  },

  videoUrl: {
    type: String,
  },
});

export const Section = mongoose.model("Section", sectionSchema);
