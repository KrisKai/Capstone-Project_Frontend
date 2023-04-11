import { createSlice } from "@reduxjs/toolkit";
import { dispatch } from "redux/store";
import { tripRoleApi } from "api";
import { setInfo } from "redux/modules/menu/menuSlice";

const initialState = {
  loading: false,
  allRole: {
    listOfRole: [],
    numOfRole: 0,
  },
  filter: {
    pageIndex: 0,
    pageSize: 10,
    roleName: "",
  },
};

const tripRoleSlice = createSlice({
  name: "tripRole",
  initialState,
  reducers: {
    getTripRoleList(state, action) {
      state.loading = true;
    },
    getTripRoleListSuccess(state, action) {
      state.allRole = action.payload;
      state.loading = false;
    },
    getTripRoleListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
});

// Actions
export const tripRoleActions = tripRoleSlice.actions;

// Selectors
export const selectAllTripRoleList = (state) => state.tripRole.allRole;
export const selectTripRoleLoading = (state) => state.tripRole.loading;
export const selectTripRoleFilter = (state) => state.tripRole.filter;
// Reducer
const tripRoleReducer = tripRoleSlice.reducer;
export default tripRoleReducer;

export function getTripRoleList(action) {
  return async () => {
    try {
      // call api select list
      const response = await tripRoleApi.getAll(action);
      // response.listOfTrip.forEach((trip) => {
      //   trip.fldEstimateArrivalTime = trip.fldEstimateArrivalTime.substring(
      //     0,
      //     10
      //   );
      //   trip.fldEstimateStartTime = trip.fldEstimateStartTime.substring(0, 10);
      // });
      dispatch(tripRoleSlice.actions.getTripRoleListSuccess(response));
      dispatch(setInfo(response.currentUserObj));
    } catch (error) {
      console.log("Failed to fetch trip role list", error);
      dispatch(tripRoleSlice.actions.getTripRoleListFailed());
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        window.location.replace("/auth/login");
      }
    }
  };
}

export function handleSearchDebounce(action) {
  return async () => {
    dispatch(tripRoleSlice.actions.setFilter(action.payload));
  };
}
