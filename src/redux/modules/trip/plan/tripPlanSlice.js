import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import { tripPlanApi } from "api";
import { setInfo } from "redux/modules/menu/menuSlice";

const initialState = {
  loading: false,
  allPlan: {
    listOfPlan: [],
    numOfPlan: 0,
  },
  filter: {
    pageIndex: 0,
    pageSize: 10,
    planName: "",
  },
};

const tripPlanSlice = createSlice({
  name: "tripPlan",
  initialState,
  reducers: {
    getTripPlanList(state, action) {
      state.loading = true;
    },
    getTripPlanListSuccess(state, action) {
      state.allPlan = action.payload;
      state.loading = false;
    },
    getTripPlanListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
});

// Actions
export const tripPlanActions = tripPlanSlice.actions;

// Selectors
export const selectAllTripPlanList = (state) => state.tripPlan.allTrip;
export const selectTripPlanLoading = (state) => state.tripPlan.loading;
export const selectTripPlanFilter = (state) => state.tripPlan.filter;
// Reducer
const tripPlanReducer = tripPlanSlice.reducer;
export default tripPlanReducer;

export function getTripPlanList(action) {
  return async () => {
    try {
      // call api select list
      const response = await tripPlanApi.getAll(action);
      // response.listOfTrip.forEach((trip) => {
      //   // trip.fldEstimateArrivalTime = trip.fldEstimateArrivalTime.substring(
      //   //   0,
      //   //   10
      //   // );
      //   // trip.fldEstimateStartTime = trip.fldEstimateStartTime.substring(0, 10);
      // });
      dispatch(tripPlanSlice.actions.getTripPlanListSuccess(response));
      dispatch(setInfo(response.currentUserObj));
    } catch (error) {
      console.log("Failed to fetch trip plan list", error);
      dispatch(tripPlanSlice.actions.getTripPlanListFailed());
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        window.location.replace("/auth/login");
      }
    }
  };
}

export function handleSearchDebounce(action) {
  return async () => {
    dispatch(tripPlanSlice.actions.setFilter(action.payload));
  };
}
