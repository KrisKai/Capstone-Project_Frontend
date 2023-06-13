import axiosInstance from "utils/axios";
import axiosInstanceUser from "utils/axiosForUser";

const feedbackApi = {
  getAll(params) {
    const url = "/feedbacks";
    return axiosInstance.get(url, { params });
  },
  getTopFeedback() {
    const url = "/feedbacks/get-top-feedback";
    return axiosInstance.get(url);
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
  getByIdUser(id) {
    const url = `/feedbacks/${id}`;
    return axiosInstanceUser.get(url);
  },
  createUser(data) {
    const url = "/feedbacks";
    return axiosInstanceUser.post(url, data);
  },
  updateUser(data) {
    const url = "/feedbacks";
    return axiosInstanceUser.put(url, data);
  },
  increaseLike(params) {
    const url = "/feedbacks/increase-like";
    return axiosInstanceUser.put(url, params);
  }
};

export default feedbackApi;
