import axiosInstance from "utils/axios";

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
    const url = `/users/reset-password/${id}`;
    return axiosInstance.put(url);
  },
};

export default userApi;
