import axios from "./axiosConfig";

export const apiGetCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "get",
    data,
  });
