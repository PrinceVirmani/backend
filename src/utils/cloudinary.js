import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // UPLOAD THE FILE ON CLOUDINARY
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // FILE HAS BEEN UPLOADED SUCCESSFULLY
    console.log("file has been uploaded", response.url);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    //remove the locally saved temporary file as the upload operation got failed

    return null;
  }
};

export { uploadOnCloudinary };