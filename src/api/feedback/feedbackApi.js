import axiosInstance from "utils/axios";

const feedbackApi = {
  getAll(params) {
    const url = "/feedbacks";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/feedbacks/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/feedbacks";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/feedbacks";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/feedbacks/${id}`;
    return axiosInstance.delete(url);
  },
};

export default feedbackApi;
