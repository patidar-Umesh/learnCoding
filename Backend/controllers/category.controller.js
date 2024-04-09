import { Category } from "../models/category.model.js";

// create tag
const createCategory = async (req, res) => {
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
    const categoryInfo = await Category.create({
      name: name,
      description: description,
    });
    console.log(`Category info ${categoryInfo}`);

    // response
    return res.status(400).json({
      success: true,
      message: "Category created successffuly",
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};

// get all Category
const allCategory = async (req, res) => {
  try {
    // fetch all Category in db
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    console.log(`All category is ${allCategory}`);

    return res.status(200).json({
      success: true,
       data: allCategory,
      message: "Successfully fetch all catogory",
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing",
    });
  }
};

export { createCategory, allCategory };
