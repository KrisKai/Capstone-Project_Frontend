import axiosInstance from "utils/axios";

const tripPlanApi = {
  getAll(params) {
    const url = "/tripPlans";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/tripPlans/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/tripPlans";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/tripPlans";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/tripPlans/${id}`;
    return axiosInstance.delete(url);
  },
};

export default tripPlanApi;
