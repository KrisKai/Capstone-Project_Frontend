import axiosInstance from "utils/axios";
import axiosInstanceUser from "utils/axiosForUser";

const tripRouteApi = {
  getAll(params) {
    const url = "/tripRoutes";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/tripRoutes/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/tripRoutes";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/tripRoutes";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/tripRoutes/${id}`;
    return axiosInstance.delete(url);
  },
  getAllUser(params) {
    const url = "/tripRoutes";
    return axiosInstanceUser.get(url, { params });
  },
  createUser(data) {
    const url = "/tripRoutes";
    return axiosInstanceUser.post(url, data);
  },
  updateUser(data) {
    const url = "/tripRoutes";
    return axiosInstanceUser.put(url, data);
  },
  deleteUser(id) {
    const url = `/tripRoutes/${id}`;
    return axiosInstanceUser.delete(url);
  },
};

export default tripRouteApi;
