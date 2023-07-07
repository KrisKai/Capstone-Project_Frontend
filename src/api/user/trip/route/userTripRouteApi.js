import axiosInstanceUser from "utils/axiosForUser";

const userTripRouteApi = {
  getAll(params) {
    const url = "/tripRoutes";
    return axiosInstanceUser.get(url, { params });
  },
  create(data) {
    const url = "/tripRoutes";
    return axiosInstanceUser.post(url, data);
  },
  update(data) {
    const url = "/tripRoutes";
    return axiosInstanceUser.put(url, data);
  },
  delete(id) {
    const url = `/tripRoutes/${id}`;
    return axiosInstanceUser.delete(url);
  },
};

export default userTripRouteApi;
