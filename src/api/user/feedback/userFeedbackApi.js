import axiosInstance from "utils/axios";
import axiosInstanceUser from "utils/axiosForUser";

const userFeedbackApi = {
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

export default userFeedbackApi;
