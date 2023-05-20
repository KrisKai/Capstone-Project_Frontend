import axiosInstance from "utils/axios";

const authUserApi = {
  login(params) {
    const url = "/authenticate/login";
    return axiosInstance.post(url, params);
  },
  loginUser(params) {
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
  confirm() {
    const url = "/users/confirm-user";
    return axiosInstance.put(url);
  },
};

export default authUserApi;
