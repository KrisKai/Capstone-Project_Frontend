import axiosInstance from '../../utils/axios';

const tripApi = {
  getAll(params) {
    const url = '/trips';
    return axiosInstance.get(url, {params});
  },
  getOne(params) {
  },
  create(params) {
  },
  update(params) {
  },
  delete(params) {
  }

}

export default tripApi;