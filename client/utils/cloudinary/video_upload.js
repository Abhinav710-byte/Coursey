import axios from "axios";

export const upload_video = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pjfblnlf');
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/coursey/video/upload',
      formData
    );
    // console.log(response);
    return response?.data

  } catch (error) {
    console.error(error);
    throw Error(error)
  }

}