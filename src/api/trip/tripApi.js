import axiosInstance from "utils/axios";

const tripApi = {
  getAll(params) {
    const url = "/trips";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/trips/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/trips";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/trips";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/trips/${id}`;
    return axiosInstance.delete(url);
  },
};

export default tripApi;
