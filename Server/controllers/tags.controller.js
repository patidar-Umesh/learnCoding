import { Tag } from "../models/tag.model.js";

// create tag
const createTag = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    console.log("Data is", name, description);

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    // save data in db
    const tagInfo = await Tag.create({
      name: name,
      description: description,
    });
    console.log(`tag info ${tagInfo}`);

    // response
    return res.status(400).json({
      success: true,
      message: "Tag created successffuly",
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};



// get all tags
const allTags = async (req, res) => {
  try {
    // fetch all tag in db
    const alltag = await Tag.find({}, { name: true, description: true });
    console.log(`All tag ${alltag}`);

    return res.status(200).json({
        success: true,
        message: "Successfully fetch all tags",
      }); 

  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};

export { createTag, allTags };
