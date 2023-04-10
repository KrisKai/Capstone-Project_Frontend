import axiosInstance from "../../utils/axios";

const tripRoleApi = {
  getAll(params) {
    const url = "/tripRoles";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/tripRoles/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/tripRoles";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/tripRoles";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/tripRoles/${id}`;
    return axiosInstance.delete(url);
  },
};

export default tripRoleApi;
