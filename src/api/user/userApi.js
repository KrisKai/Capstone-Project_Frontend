import axiosInstance from "../../utils/axios";

const userApi = {
  userSelect(params) {
    const url = "/users";
    return axiosInstance.get(url, params);
  },
};

export default userApi;
