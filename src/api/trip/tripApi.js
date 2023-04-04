import axiosInstance from "../../utils/axios";

const tripApi = {
  getAll(params) {
    const url = "/trips";
    return axiosInstance.get(url, { params });
  },
  getOne(params) {},
  create(data) {
    const url = "/trips";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/trips";
    return axiosInstance.patch(url, data);
  },
  delete(id) {
    const url = `/trips/${id}`;
    return axiosInstance.delete(url);
  },
};

export default tripApi;
