import axiosInstance from "utils/axios";
import axiosInstanceUser from "utils/axiosForUser";

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
  tripStatistic() {
    const url = `/trips/trip-statistic`;
    return axiosInstance.get(url);
  },
  createUser(data) {
    const url = "/trips";
    return axiosInstanceUser.post(url, data);
  },
  updateUser(data) {
    const url = "/trips";
    return axiosInstanceUser.put(url, data);
  },
  tripHistory() {
    const url = `/trips/trip-history`;
    return axiosInstanceUser.get(url);
  },
  getByIdUser(id) {
    const url = `/trips/${id}`;
    return axiosInstanceUser.get(url);
  },
};

export default tripApi;
