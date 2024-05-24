import axios from "./axiosConfig";

export const apiCreateNewPropertyType = (data) => {
  return axios({
    method: "post",
    url: '/property-type/',
    data
  })
}
