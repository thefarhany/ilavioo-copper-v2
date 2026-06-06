export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  type: "image" | "video";
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dqcdwv7du";
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "ilavioo_unsigned";

export const uploadToCloudinary = async (
  file: File,
  type: "image" | "video" = "image"
): Promise<CloudinaryUploadResult> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const resourceType = type === "video" ? "video" : "image";

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || "Cloudinary upload failed");
  }

  const data = await response.json();

  return {
    url: data.secure_url,
    publicId: data.public_id,
    type,
  };
};

export const uploadMultipleToCloudinary = async (
  files: File[],
  type: "image" | "video" = "image"
): Promise<CloudinaryUploadResult[]> => {
  const uploads = files.map((file) => uploadToCloudinary(file, type));
  return Promise.all(uploads);
};
