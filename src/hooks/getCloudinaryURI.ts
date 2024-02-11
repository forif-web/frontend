import { CloudinaryRes } from "@/app/types/cloudinary";
import axios from "axios";
/**
 * Get image uri posted by cloudinary api
 * @param profileImg
 * @param studentId
 * @returns Img uri
 */
async function getUserPhotoURI(profileImg: File, studentId: string) {
  const formData = new FormData();
  formData.append("file", profileImg);

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dheikvmxu/image/upload",
      formData,
      {
        params: {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          api_key: process.env.CLOUDINARY_API_KEY,
          folder: "profiles",
          public_id: studentId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data: CloudinaryRes = res.data;
    return data.url;
  } catch (error) {
    throw error;
  }
}

async function getStudyPhotoURI(profileImg: File, studyId: string) {
  const formData = new FormData();
  formData.append("file", profileImg);

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/dheikvmxu/image/upload",
      formData,
      {
        params: {
          upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
          api_key: process.env.CLOUDINARY_API_KEY,
          folder: "studies",
          public_id: studyId,
        },
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const data: CloudinaryRes = res.data;
    return data.url;
  } catch (error) {
    throw error;
  }
}

export { getStudyPhotoURI, getUserPhotoURI };
