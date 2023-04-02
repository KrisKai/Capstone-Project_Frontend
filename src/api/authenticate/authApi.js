import axiosInstance from "../../utils/axios";

const authApi = {
  login(params) {
    const url = "/authenticate/login";
    return axiosInstance.post(url, params);
  },
};

export default authApi;
