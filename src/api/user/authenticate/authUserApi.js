import axiosInstanceUser from "utils/axiosForUser";

const authUserApi = {
  login(params) {
    const url = "/authenticate/login";
    return axiosInstanceUser.post(url, params);
  },
  loginUser(params) {
    const url = "/authenticate/login-user";
    return axiosInstanceUser.post(url, params);
  },
  register(params) {
    const url = "/authenticate/register-user";
    return axiosInstanceUser.post(url, params);
  },
  getCurrentUser() {
    const url = "/authenticate/getCurrentUser";
    return axiosInstanceUser.get(url);
  },
  getCurrentInfo() {
    const url = "/authenticate/getCurrentInfo";
    return axiosInstanceUser.get(url);
  },
  confirm() {
    const url = "/users/confirm-user";
    return axiosInstanceUser.put(url);
  },
  checkUserHavingInterest() {
    const url = `/users/check-interest`;
    return axiosInstanceUser.get(url);
  },
  createUserInterest(params) {
    const url = `/users/create-user-interest`;
    return axiosInstanceUser.post(JSON.stringify(params));
  }
};

export default authUserApi;
