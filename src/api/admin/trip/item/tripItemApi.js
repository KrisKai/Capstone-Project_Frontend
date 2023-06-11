import axiosInstance from "utils/axios";
import axiosInstanceUser from "utils/axiosForUser";

const tripItemApi = {
  //admin
  getAll(params) {
    const url = "/tripItems";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/tripItems/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/tripItems";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/tripItems";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/tripItems/${id}`;
    return axiosInstance.delete(url);
  },
  //user
  getAllUser(params) {
    const url = "/tripItems";
    return axiosInstanceUser.get(url, { params });
  },
  createUser(data) {
    const url = "/tripItems";
    return axiosInstanceUser.post(url, data);
  },
  updateUser(data) {
    const url = "/tripItems";
    return axiosInstanceUser.put(url, data);
  },
  deleteUser(id) {
    const url = `/tripItems/${id}`;
    return axiosInstanceUser.delete(url);
  },
};

export default tripItemApi;
