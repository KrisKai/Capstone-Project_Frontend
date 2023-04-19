import axiosInstance from "utils/axios";

const itemApi = {
  getAll(params) {
    const url = "/items";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/items/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/items";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/items";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/items/${id}`;
    return axiosInstance.delete(url);
  },
};

export default itemApi;
