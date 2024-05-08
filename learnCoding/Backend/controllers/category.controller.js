import { Category } from "../models/category.model.js";

// create tag
const createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;
    // console.log("Data is", name, description);

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
    // console.log(`Category info ${categoryInfo}`);

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
    // console.log(`All category is ${allCategory}`);

    return res.status(200).json({
      success: true,
      data: allCategory,
      message: "Successfully fetch all catogory",
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "somthing wrong in fetch all category",
    });
  }
};


// get category  course
const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

const categoryCourses = async (req, res) => {
  try {
    const { categoryId } = req.body;
    // console.log("category id is ", categoryId);

    // Get courses for the specified category
    const selectedCategory = await Category.findById({_id:categoryId})
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: "ratingAndReview",
      })
      .exec();

    // console.log("courses is", selectedCategory)

    // check selected category course is available or not
    if (!selectedCategory) {
      console.log("Category not found");
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // no course available based on selected category
    if (selectedCategory.courses?.length === 0) {
      console.log("No courses found for the selected category");
       return res.status(404).json({
        success: false,
        message: "No courses found for the selected category",
      });
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected?.length)]
        ._id
    )
      .populate({
        path: "courses",
        match: { status: "Published" },
      })
      .exec();

    //console.log("Other courses", differentCategory)

    // Get top-selling courses across all categories
    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap((category) => category.courses);

    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    // console.log("mostSellingCourses COURSE", mostSellingCourses)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export { createCategory, allCategory, categoryCourses };
