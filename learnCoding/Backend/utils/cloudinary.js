import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// setup cloudinary
const cloudinaryConnect = () => {
  cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`,
  });
};

// cloudinary handler
const uploadOnCloudinary = async (file, folder) => {
  try {
    const options = { folder, resource_type: "auto" };

    // return
    return await cloudinary.uploader.upload(file?.tempFilePath, options);
  } catch (error) {
    console.log(`something went wrong ${error}`);
    return null;
  }
};

// cloudinary delete handler
const deleteFromCloudinary = async (file) => {
  try {
    const fileUrl = file;
    const fileType = fileUrl?.endsWith(".mp4") || fileUrl?.endsWith(".mov");
    console.log("file type ", fileType);

    let publicId = fileUrl?.split("/");

    let result = publicId?.slice(7, 9).join("/");
    result = result?.split(".").slice(0, 1).join();

    console.log("public id", result);

    return await cloudinary.uploader.destroy(result, {
      resource_type: `${fileType ? "video" : "image"}`,
    });
  } catch (error) {
    console.log(`something went wrong ${error}`);
  }
};

export { uploadOnCloudinary, cloudinaryConnect, deleteFromCloudinary };
