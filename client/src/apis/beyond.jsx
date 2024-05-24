import axios from "axios";

export const apiUploadImages = (data) => {
  return axios({
    method: "post",
    url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_COUDINARY_NAME}/image/upload`,
    data
  }).then(response => response.data)
  .catch(error => {
    console.error('Error uploading image:', error);
    throw error;
  });
};
