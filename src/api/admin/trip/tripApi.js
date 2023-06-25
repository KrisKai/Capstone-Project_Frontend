import axiosInstance from "utils/axios";
import axiosInstanceImage from "utils/axiosForImage";

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
    return axiosInstanceImage.put(url, data);
  },
  delete(id) {
    const url = `/trips/${id}`;
    return axiosInstance.delete(url);
  },
  tripStatistic() {
    const url = `/trips/trip-statistic`;
    return axiosInstance.get(url);
  },
};

export default tripApi;
