import axios from "axios";
import { REACT_APP_API_URL } from "../config";

const axiosInstanceImage = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Add a request interceptor
axiosInstanceImage.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axiosInstanceImage.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosInstanceImage;
