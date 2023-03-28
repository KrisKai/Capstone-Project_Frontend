import axiosInstance from '../../utils/axios';

const tripApi = {
  getAll(params) {
    const url = '/trips';
    return axiosInstance.get(url, params);
  },
}

export default tripApi;