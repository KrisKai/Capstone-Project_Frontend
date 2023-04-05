import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import tripApi from "../../../api/trip/tripApi";

const initialState = {
  loading: false,
  allTrip: {
    listOfTrip: [],
    numOfTrip: 0,
  },
  filter: {
    pageIndex: 0,
    pageSize: 10,
    tripName: "",
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    totalRows: 15,
  },
};

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    getTripList(state, action) {
      state.loading = true;
    },
    getTripListSuccess(state, action) {
      state.allTrip = action.payload;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    getTripListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
});

// Actions
export const tripActions = tripSlice.actions;

// Selectors
export const selectAllTripList = (state) => state.trip.allTrip;
export const selectTripLoading = (state) => state.trip.loading;
export const selectTripFilter = (state) => state.trip.filter;
export const selectTripPagination = (state) => state.trip.pagination;
// Reducer
const tripReducer = tripSlice.reducer;
export default tripReducer;

export function getTripList(action) {
  return async () => {
    try {
      // call api select list
      var url = "/trips";
      const response = await tripApi.getAll(action);
      response.listOfTrip.forEach(trip => {
        trip.fldEstimateArrivalTime = trip.fldEstimateArrivalTime.substring(0, 10)
        trip.fldEstimateStartTime = trip.fldEstimateStartTime.substring(0, 10)
      });
      dispatch(tripSlice.actions.getTripListSuccess(response));
    } catch (error) {
      console.log("Failed to fetch trip list", error);
      dispatch(tripSlice.actions.getTripListFailed());
    }
  };
}

export function handleSearchDebounce(action) {
  return async () => {
    dispatch(tripSlice.actions.setFilter(action.payload));
  };
}
