import mongoose from "mongoose";
import { Section } from "../models/section.model.js";
import { SubSection } from "../models/subSection.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create Sub section handler

const createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, description } = req.body;
    console.log(`data is`, sectionId, title, description);

    let videoFile = req.files.video;

    console.log(`video file is ${videoFile}`);

    // validate all fields
    if (!sectionId || !title || !description) {
      return res.status(400).json({
        success: false,
        message: " all fields are required for create sub section",
      });
    }

    // upload video file on cloudinary
    const uploadedVideoFile = await uploadOnCloudinary(
      videoFile,
      process.env.CLOUDINARY_VIDEO_FOLDER
    );

    console.log(`uploaded video file is ${uploadedVideoFile.public_id}`);

    if (!uploadedVideoFile) {
      return res.status(400).json({
        success: false,
        message: " Error getting when upload on cloudinary",
      });
    }

    // save all data
    const createdSubSection = await SubSection.create({
      title,
      // timeDuration:
      description,
      videoUrl: uploadedVideoFile.secure_url,
    });

    // insert sub Section in section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: createdSubSection._id,
        },
      },
      { new: true }
    );
    console.log(`updated section is ${updatedSection}`);

    return res.status(200).json({
      success: true,
      message: "successfully created sub section",
      data: updatedSection,
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing went wrong",
    });
  }
};

// update sub section by id
const updateSubSection = async (req, res) => {
  try {
    // fetch data
    const { subSectionId } = req.params.id;
    const { title, timeDuration, description } = req.body;
    const videoFile = req.files.video;

    // validate all fields
    if (!title || !timeDuration || !description || !videoFile) {
      return res.status(400).json({
        success: false,
        message: " all fields are required for update sub section",
      });
    }

    // upload video file on cloudinary
    const uploadedVideoFile = await uploadOnCloudinary(
      videoFile,
      process.env.CLOUDINARY_VIDEO_FOLDER
    );
    console.log(`upladed video file is ${uploadedVideoFile.secure_url}`);

    if (!uploadedVideoFile) {
      return res.status(400).json({
        success: false,
        message: " Error getting when upload on cloudinary",
      });
    }

    // save all data
    const updatedSubSection = await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      {
        title,
        timeDuration,
        description,
        videoUrl: uploadedVideoFile.secure_url,
      },
      { new: true }
    );
    console.log(`something went wrong ${updatedSubSection}`);

    return res.status(200).json({
      success: false,
      message: "Update succssfully",
      data: updateSubSection,
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "update faild",
    });
  }
};

// delete Sub section handler

const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;

    // delete id section array
    await Section.findByIdAndUpdate(
      { _id: new mongoose.Types.ObjectId(sectionId) },
      {
        $pull: {
          subSection: subSectionId
        },
      },
      {
        new: true,
      }
    );

    // delete sub section by id
    const deletedsubSection = await SubSection.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(subSectionId),
    });


    return res.status(200).json({
      success: true,
      message: "Delete successfully seb section",
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};

// export all handler
export { createSubSection, updateSubSection, deleteSubSection };
