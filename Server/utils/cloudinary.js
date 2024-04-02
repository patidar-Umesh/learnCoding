import { v2 as cloudinary } from "cloudinary";

// setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary handler
const uploadOnCloudinary = async (file, folder, height, quality) => {
  try {
    const options = { folder, resource_Type: "auto" };
    if (height) {
      options.height = height;
    }
    if (quality) {
      options.quality = quality;
    }

    // return
     return  await cloudinary.uploader.upload(file.tempFilePath, options);

  } catch (error) {
    console.log(`something went wrong ${error}`);
    return res.status(500).json({
      success: false,
      message: "something wrong",
    });
  }
};


export {uploadOnCloudinary}
