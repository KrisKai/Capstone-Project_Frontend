import axiosInstanceImageUser from "utils/axiosForImageUser";
import axiosInstanceUser from "utils/axiosForUser";

const userApi = {
  getAll(params) {
    const url = "/users";
    return axiosInstanceUser.get(url, { params });
  },
  getById(id) {
    const url = `/users/${id}`;
    return axiosInstanceUser.get(url);
  },
  create(data) {
    const url = "/users";
    return axiosInstanceUser.post(url, data);
  },
  update(data) {
    const url = "/users";
    return axiosInstanceUser.put(url, data);
  },
  delete(id) {
    const url = `/users/${id}`;
    return axiosInstanceUser.delete(url);
  },
  reset(id) {
    const url = "/users/reset-password";
    return axiosInstanceUser.put(url, id);
  },
  changePassword(data) {
    const url = "/users/change-password";
    return axiosInstanceUser.put(url, data);
  },
  changeStatus(data) {
    const url = "/users/change-status";
    return axiosInstanceUser.put(url, data);
  },
  confirm(data) {
    const url = "/users/confirm-user";
    return axiosInstanceUser.put(url, data);
  },
  deleteInterestByInterestId(id) {
    const url = `/users/delete-interest-by-interest-id?id=${id}`;
    return axiosInstanceUser.delete(url);
  },
  updateAvatar(data) {
    const url = "/users/update-avatar";
    return axiosInstanceImageUser.put(url, data);
  },
};

export default userApi;
