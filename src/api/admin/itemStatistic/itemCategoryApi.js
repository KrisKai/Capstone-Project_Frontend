import axiosInstance from "utils/axios";

const itemCategoryApi = {
  getAll(params) {
    const url = "/itemcategories";
    return axiosInstance.get(url, { params });
  },
  getById(id) {
    const url = `/itemcategories/${id}`;
    return axiosInstance.get(url);
  },
  create(data) {
    const url = "/itemcategories";
    return axiosInstance.post(url, data);
  },
  update(data) {
    const url = "/itemcategories";
    return axiosInstance.put(url, data);
  },
  delete(id) {
    const url = `/itemcategories/${id}`;
    return axiosInstance.delete(url);
  },
};

export default itemCategoryApi;
