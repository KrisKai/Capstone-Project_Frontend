import axiosInstanceUser from "utils/axiosForUser";

const userTripMemberApi = {
  getAll(params) {
    const url = "/tripMembers";
    return axiosInstanceUser.get(url, { params });
  },
  getById(id) {
    const url = `/tripMembers/${id}`;
    return axiosInstanceUser.get(url);
  },
  create(data) {
    const url = "/tripMembers";
    return axiosInstanceUser.post(url, data);
  },
  update(data) {
    const url = "/tripMembers";
    return axiosInstanceUser.put(url, data);
  },
  confirmTrip(data) {
    const url = "/tripMembers/confirm-trip";
    return axiosInstanceUser.put(url, data);
  },
  sendMail(data) {
    const url = "/tripMembers/send-mail";
    return axiosInstanceUser.put(url, data);
  },
  delete(id) {
    const url = `/tripMembers/${id}`;
    return axiosInstanceUser.delete(url);
  },
  getAllByEmailOrUsername(params) {
    const url = "/tripMembers/get-all-by-email-or-username";
    return axiosInstanceUser.get(url, { params });
  },
  getAllUser(params) {
    const url = "/tripMembers/get-all-user";
    return axiosInstanceUser.get(url, { params });
  },
};

export default userTripMemberApi;
