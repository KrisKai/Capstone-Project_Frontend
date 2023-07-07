import axiosInstance from "utils/axios";
import axiosInstanceImage from "utils/axiosForImage";

const userApi = {
  getAll(params) {
    const url = "/users";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/users/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/users";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/users";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/users/${id}`;
    return axiosInstance.delete(url);
  },
  reset(id) {
    const url = "/users/reset-password";
    return axiosInstance.put(url, id);
  },
  changePassword(data) {
    const url = "/users/change-password";
    return axiosInstance.put(url, data);
  },
  changeStatus(data) {
    const url = "/users/change-status";
    return axiosInstance.put(url, data);
  },
  confirm(data) {
    const url = "/users/confirm-user";
    return axiosInstance.put(url, data);
  },
  updateAvatar(data) {
    const url = "/users/update-avatar";
    return axiosInstanceImage.put(url, data);
  },
};

export default userApi;
