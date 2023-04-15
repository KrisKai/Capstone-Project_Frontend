import axiosInstance from "utils/axios";

const authApi = {
  login(params) {
    const url = "/authenticate/login";
    return axiosInstance.post(url, params);
  },
  getCurrentUser() {
    const url = "/authenticate/getCurrentUser";
    return axiosInstance.get(url);
  },
  getCurrentInfo() {
    const url = "/authenticate/getCurrentInfo";
    return axiosInstance.get(url);
  },
};

export default authApi;
