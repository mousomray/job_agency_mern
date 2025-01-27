// Here I create axiosInstance

import axios from "axios";

let axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token !== null || token !== undefined) {
      config.headers["user_authentication"] = token; // Here I pass token 
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);


export default axiosInstance;  