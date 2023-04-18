import axiosInstance from "utils/axios";

const tripMemberApi = {
  getAll(params) {
    const url = "/tripMembers";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/tripMembers/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/tripMembers";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/tripMembers";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/tripMembers/${id}`;
    return axiosInstance.delete(url);
  },
};

export default tripMemberApi;
