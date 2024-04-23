import { Section } from "../models/section.model.js";
import { Course } from "../models/course.model.js";
import mongoose from "mongoose";

// create section for course

const createSection = async (req, res) => {
  try {
    // fetch data
    const { sectionName, courseId } = req.body;
    console.log("section name and id", sectionName, courseId);

    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Section name is required",
      });
    }

    // save  section name in db
    const savedSection = await Section.create({ sectionName: sectionName });
    console.log("savedSection", savedSection);

    const course = await Course.findById(courseId).populate({
      path: "courseContent",
      populate: { path: "subSection" },
    });
    console.log("savedSection", course);

    // update courseContent in Course schema
    const upadatCourse = await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: savedSection._id,
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
      .exec();

    console.log(`upadated course is ${upadatCourse.courseContent}`);
    console.log("hello ji");

    return res.status(200).json({
      success: true,
      message: "Section created Successfully",
      data: upadatCourse,
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
    const { sectionName, sectionId, courseId } = req.body;
    // console.log(`updated name is ${(sectionName, sectionId)}`);

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
    // console.log(`updated  section name is 85 ${updatedSectionName}`);

    const updatedCourse = await Course.findById({ _id: courseId })
      .populate({
        path: "courseContent",
        populate: { path: "subSection" },
      })
      .exec();

    // response
    return res.status(200).json({
      success: true,
      message: "Section name upadate successfully",
      data: updatedCourse,
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
    const { sectionId, courseId } = req.body;

    const deletedSection = await Section.findByIdAndDelete(sectionId);

    const course = await Course.findByIdAndUpdate(courseId, {
                                                    $pull: { courseContent: sectionId },
                                                  })
                                                  .populate({ 
                                                    path: "courseContent", populate: "subSection" 
                                                  }).exec();

    return res.status(200).json({
      success: true,
      message: "Section Delete Successfully",
      data: course,
    });
  } catch (error) {
    console.log("errr0", error);
    return res.status(500).json({
      success: false,
      message: "Section not Deleted",
    });
  }
};

export { createSection, updateSection, deleteSection };
