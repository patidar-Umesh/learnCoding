import { Section } from "../models/section.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

// create section for course

const createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section name is required",
      });
    }

    // save  section name in db
    const savedSection = await Section.create({ sectionName: sectionName });
    console.log("savedSection", savedSection);

    // update courseContent in Course schema
    console.log("savedSection", savedSection);
    const upadatCourse = await Course.findByAndUpdate(
                                                     courseId,
                                                    {
                                                      $push: {
                                                        courseContent: savedSection._id,
                                                      },
                                                    },
                                                    { new: true }
                                                  ).populate({
                                                    path: "courseContent",
                                                    populate: {
                                                      path: "subSection",
                                                    },
                                                  })
                                                  .exec();;

    console.log(`upadted course is ${upadatCourse}`);

    return res.status(200).json({
      success: true,
      message: "add section successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "somthing went wrong",
    });
  }
};

// update section
const updateSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, sectionId } = req.body;

    if (!sectionName) {
      return res.status(400).json({
        success: false,
        message: "Section name is required",
      });
    }

    // update section name in db
    const updatedSectionName = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        sectionName: sectionName,
      },
      { new: true }
    );
    console.log(`updated name is ${updatedSectionName.sectionName}`);

    // response
    return res.status(200).json({
      success: false,
      message: "Section name upadate successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "updation faild",
    });
  }
};

// delete section
const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;
    console.log('section id',sectionId);

    const deletedSection = await Section.findByIdAndDelete(sectionId);
    console.log(deletedSection);

    await Course.findByIdAndUpdate(sectionId,
    
      {
        courseContent: null,
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "section delete successfully",
    });
  } catch (error) {
    console.log('errr0', error);
    return res.status(500).json({
      success: false,
      message: "problem in deletion",
    });
  }
};

export { createSection, updateSection, deleteSection };
