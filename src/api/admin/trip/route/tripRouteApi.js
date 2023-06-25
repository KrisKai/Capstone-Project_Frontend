import axiosInstance from "utils/axios";

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
};

export default tripRouteApi;
