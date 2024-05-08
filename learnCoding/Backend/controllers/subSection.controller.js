import mongoose from "mongoose";
import { Section } from "../models/section.model.js";
import { SubSection } from "../models/subSection.model.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Course } from "../models/course.model.js";

// create Sub section handler

const createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, description } = req.body;
    // console.log(`data is`, sectionId, title, description);

    let videoFile = req.files.video;

    // console.log(`video file is ${videoFile}`);

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

    // console.log(`uploaded video file is ${uploadedVideoFile}`);

    if (!uploadedVideoFile) {
      return res.status(400).json({
        success: false,
        message: " Error getting when upload on cloudinary",
      });
    }

    // save all data
    const createdSubSection = await SubSection.create({
      title,
      timeDuration: uploadedVideoFile?.duration,
      description,
      videoUrl: uploadedVideoFile?.secure_url,
    });

    // insert sub Section id in section
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: createdSubSection._id,
        },
      },
      { new: true }
    )
      .populate("subSection")
      .exec();

    // console.log(`updated section is ${updatedSection}`);

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
    const { subSectionId, sectionId } = req.body;
    const { title, description } = req.body;
    const videoFile = req.files?.video;

    console.log("video file is", videoFile);

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "SubSection not found",
      });
    }

    if(title || description){
      subSection.title = title
      subSection.description = description
    }


    // upload video file on cloudinary
    if (videoFile) {
      const uploadedVideoFile = await uploadOnCloudinary(
        videoFile,
        process.env.CLOUDINARY_VIDEO_FOLDER
      );
      console.log(`upladed video file is ${uploadedVideoFile?.secure_url}`);

      if (!uploadedVideoFile) {
        return res.status(400).json({
          success: false,
          message: " Error getting when upload on cloudinary",
        });
      }
      
      // save all data
      subSection.videoUrl = uploadedVideoFile?.secure_url
      subSection.timeDuration = uploadedVideoFile?.duration
      
    }

    await subSection.save()

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    console.log(`updated section ${updatedSection}`);

    return res.status(200).json({
      success: true,
      message: "Update succssfully",
      data: updatedSection,
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "update failed",
    });
  }
};

// delete Sub section handler

const deleteSubSection = async (req, res) => {
  try {
    const { subSectionId, sectionId } = req.body;
    console.log("hello", subSectionId, sectionId);

    // delete id section array
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      },
      {
        new: true,
      }
    );

    // get video url before delete subsection
    const subSection = await SubSection.findById(subSectionId);
    const videoUrl = subSection?.videoUrl;

    console.log("hello", subSection);

    // delete video from cloudinary
    const deletedVideo = await deleteFromCloudinary(videoUrl);

    if (deletedVideo?.result !== "ok") {
      return res.status(404).json({
        success: false,
        message: "Could not delte video from cloudinary",
      });
    }
    console.log("successfully deleted video");

    // delete sub section by id
    const deletedsubSection = await SubSection.findByIdAndDelete({
      _id: new mongoose.Types.ObjectId(subSectionId),
    });

    const updatedSection = await Section.findById({ _id: sectionId })
      .populate("subSection")
      .exec();

    return res.status(200).json({
      success: true,
      message: "Delete successfully sub section",
      data: updatedSection,
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
