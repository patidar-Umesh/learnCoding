import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({

  sectionName: {
      type: String,
      required: true,
  },

  subSection: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'SubSection'
    },
  ],

},
{timestamps: true});

export const Section = mongoose.model("Section", sectionSchema);
