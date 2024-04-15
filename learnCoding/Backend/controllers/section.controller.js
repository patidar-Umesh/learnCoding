import { Section } from "../models/section.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

// create section for course

const createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;
    console.log('section name and id',sectionName, courseId);

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

    const upadatCourse = await Course.findByIdAndUpdate(
                                                     {_id :courseId},
                                                    {
                                                      $push: {
                                                        courseContent:  savedSection._id
                                                      },
                                                    },
                                                    { new: true }
                                                  )
                                                  .populate({
                                                    path: "courseContent",
                                                    populate: {
                                                      path: "subSection",
                                                    },
                                                  })
                                                  .exec();;

    console.log(`upadated course is ${upadatCourse.courseContent}`);

    console.log('hello ji');

    return res.status(200).json({
      success: true,
      message: "add section successfully",
      data: upadatCourse
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
    console.log(`updated name is ${ sectionName, sectionId}`);
  

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

    console.log(`updated  section name is 83 ${updatedSectionName}`);

    // response
    return res.status(200).json({
      success: true,
      message: "Section name upadate successfully",
      data : updatedSectionName
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "updation failed",
    });
  }
};

// delete section
const deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.body;

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    await Course.findById(sectionId,
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
