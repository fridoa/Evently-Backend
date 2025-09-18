import { v2 as cloudinary } from "cloudinary";
import { COUDINARY_CLOUD_NAME, COUDINARY_API_KEY, COUDINARY_API_SECRET } from "./env";

cloudinary.config({
  cloud_name: COUDINARY_CLOUD_NAME,
  api_key: COUDINARY_API_KEY,
  api_secret: COUDINARY_API_SECRET,
});

const toDataURL = (file: Express.Multer.File) => {
  const b64 = file.buffer.toString("base64");
  return `data:${file.mimetype};base64,${b64}`;
};

const cloudinaryUtil = {
  async uploadSingle(file: Express.Multer.File) {
    const fileDataUrl = toDataURL(file);
    const result = await cloudinary.uploader.upload(fileDataUrl, {
      resource_type: "auto",
    });
    return result;
  },
  async uploadMultiple(files: Express.Multer.File[]) {
    const uploadPromises = files.map((item) => {
      return cloudinaryUtil.uploadSingle(item);
    });
    const results = await Promise.all(uploadPromises);
    return results;
  },
  async remove(publicId: string) {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  },
};

export default cloudinaryUtil;
