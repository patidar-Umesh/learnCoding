import { v2 as cloudinary } from "cloudinary";

// setup cloudinary
const cloudinaryConnect = () => { 
  cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})
};


// cloudinary handler
const uploadOnCloudinary = async (file, folder) => {
  try {
    const options = { folder, resource_Type: "auto" };
    // if (height) {
    //   options.height = height;
    // }
    // if (quality) {
    //   options.quality = quality;
    // }

    // return
     return  await cloudinary.uploader.upload(file.tempFilePath, options);

  } catch (error) {
    console.log(`something went wrong ${error}`);
     }
};


export {uploadOnCloudinary, cloudinaryConnect}
