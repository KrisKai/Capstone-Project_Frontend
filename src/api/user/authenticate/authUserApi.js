import axiosInstance from "utils/axios";

const authUserApi = {
  login(params) {
    const url = "/authenticate/login-user";
    return axiosInstance.post(url, params);
  },
  register(params) {
    const url = "/authenticate/register-user";
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

export default authUserApi;
