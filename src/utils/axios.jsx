import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import {REACT_APP_API_URL} from '../config';

const axiosInstance = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  config => {
    console.log(1)
    if (!config.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem("access_token")).token;
      console.log(2)
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
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

export default axiosInstance;