import axios from "./axiosConfig";

export const apiGetCurrent = (data) =>
  axios({
    url: "/user/current",
    method: "get",
    data,
  });

export const apiGetRoles = (data) =>
  axios({
    url: "/user/roles",
    method: "get",
    data,
  });
