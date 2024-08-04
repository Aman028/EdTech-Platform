
const cloudinary = require('cloudinary').v2;

exports.uploadImageToCloudinary =  async (file,folder,height,quality) =>{
  console.log("cloudinary me")
    const options = {folder};
    if(height) options.height = height;
    if (quality) {
        options.quality=quality;
    }

    console.log("cloudinary k baad");

    options.resource_type ="auto";

    return await cloudinary.uploader.upload(file.tempFilePath, options)
}
