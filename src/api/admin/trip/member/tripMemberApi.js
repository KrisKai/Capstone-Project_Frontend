import axiosInstance from "utils/axios";
import axiosInstanceImage from "utils/axiosForImage";
import qs from 'qs';

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
    return axiosInstanceImage.post(url, qs.stringify(data));
  },
  update(data) {
    const url = "/tripMembers";
    return axiosInstance.put(url, data);
  },
  confirmTrip(data) {
    const url = "/tripMembers/confirm-trip";
    return axiosInstance.put(url, data);
  },
  sendMail(data) {
    const url = "/tripMembers/send-mail";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/tripMembers/${id}`;
    return axiosInstance.delete(url);
  },
};

export default tripMemberApi;
