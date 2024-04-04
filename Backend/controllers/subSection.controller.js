import { Section } from "../models/section.model.js";
import { SubSection } from "../models/subSection.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// create Sub section handler

const createSubSection = async (req, res) => {
  try {
    // fetch data
    const { sectionId, title, timeDuration, description } = req.body;
    console.log(`data is`,sectionId, title, timeDuration, description );

    const videoFile = req.files.videoFile;
    console.log(`video file is ${videoFile}`);


    // validate all fields
    if (!sectionId || !title || !timeDuration || !description  || !videoFile) {
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
    console.log(`upladed video file is ${uploadedVideoFile}`);

    if (!uploadedVideoFile) {
      return res.status(400).json({
        success: false,
        message: " Error getting when upload on cloudinary",
      });
    }

    // save all data
    const createdSubSection = await SubSection.create({
      title,
      timeDuration,
      description,
      videoUrl: uploadedVideoFile.secure_url,
    });
    console.log(`created section is ${createdSubSection}`)

    // insert sub Section in section
    const updatedSection =  await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: createdSubSection._id,
        },
      },
      { new: true }
    );
    console.log(`updated section is ${updatedSection}`)

    return res.status(200).json({
        success: true,
        message: "successfully created sub section",
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
    const videoFile = req.files.file;

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
    const { SubSectionId } = req.params.id;

    // delete sub section by id
    await SubSection.findByIdAndDelete({ _id: SubSectionId });
    
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
