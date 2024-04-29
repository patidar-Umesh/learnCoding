import { CourseProgress } from "../models/courseProgress.model.js";
import { SubSection } from "../models/subSection.model.js";


 export const updateCourseProgress = async (req, res) => {
  try {
    // fetch courseid and subsectionid and userid
    const { courseId, subSectionId } = req.body;
    console.log('hello ji', courseId, subSectionId)
    const userId = req.user.id;

    // find subsectionbyid
    const subSection = await SubSection.findById(subSectionId);

    // validate subsection
    if (!subSection) {
      return res.status(404).json({ error: "Invalid SUbSection" });
    }

    console.log("SubSection Validation Done");

    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      completedVideos: subSectionId
    });

    if (!courseProgress) {
      return res.status(404).json({
        success: false,
        message: "Course Progress does not exist",
      });
    } else {
      console.log("Course Progress Validation Done");
    }
      if (courseProgress.completedVideos.includes(subSectionId)) {
        return res.status(400).json({
          error: "Subsection already completed",
        });
      }

      courseProgress.completedVideos.push(subSectionId);
      console.log("Copurse Progress Push Done");
    

    await courseProgress.save();
    console.log("Course Progress Save call Done");

    return res.status(200).json({
      success: true,
      message: "Course Progress Updated Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ error: "Internal Server Error" });
  }
};

