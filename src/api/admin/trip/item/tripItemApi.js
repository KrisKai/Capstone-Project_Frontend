import axiosInstance from "utils/axios";

const tripItemApi = {
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
};

export default tripItemApi;
