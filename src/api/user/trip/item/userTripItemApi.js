import axiosInstanceUser from "utils/axiosForUser";

const userTripItemApi = {
  //user
  getAll(params) {
    const url = "/tripItems";
    return axiosInstanceUser.get(url, { params });
  },
  create(data) {
    const url = "/tripItems";
    return axiosInstanceUser.post(url, data);
  },
  update(data) {
    const url = "/tripItems";
    return axiosInstanceUser.put(url, data);
  },
  delete(id) {
    const url = `/tripItems/${id}`;
    return axiosInstanceUser.delete(url);
  },
};

export default userTripItemApi;
