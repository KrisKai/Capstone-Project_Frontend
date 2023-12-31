import axiosInstanceImageUser from "utils/axiosForImageUser";
import axiosInstanceUser from "utils/axiosForUser";

const userTripApi = {
  getAll(params) {
    const url = "/trips";
    return axiosInstanceUser.get(url, { params });
  },
  getById(id) {
    const url = `/trips/${id}`;
    return axiosInstanceUser.get(url);
  },
  create(data) {
    const url = "/trips/create-trip-user";
    return axiosInstanceImageUser.post(url, data);
  },
  update(data) {
    const url = "/trips";
    return axiosInstanceImageUser.put(url, data);
  },
  delete(id) {
    const url = `/trips/${id}`;
    return axiosInstanceUser.delete(url);
  },
  tripHistory() {
    const url = `/trips/trip-history`;
    return axiosInstanceUser.get(url);
  },
  updateTripThumbnail(data) {
    const url = "/trips/update-trip-thumbnail";
    return axiosInstanceUser.put(url, data);
  },
};

export default userTripApi;
