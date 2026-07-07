import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
}

export const uploadImage = (
  file: Express.Multer.File,
  folder = "battle",
): Promise<CloudinaryUploadResponse> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          return reject(error);
        }

        if (!result) {
          return reject(new Error("Image upload failed."));
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(stream);
  });
};

export const deleteImage = async (publicId: string): Promise<void> => {
  if (!publicId) return;

  await cloudinary.uploader.destroy(publicId, {
    resource_type: "image",
  });
};


// code example 
const updateImage = async (
  file: Express.Multer.File,
  oldPublicId: string,
  folder = "battle",
) => {
  // Delete old image
  if (oldPublicId) {
    await deleteImage(oldPublicId);
  }

  // Upload new image
  const image = await uploadImage(file, folder);

  return image;
};