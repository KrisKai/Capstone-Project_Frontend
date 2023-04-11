import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tripApi from "api/trip/tripApi";

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
};

//thunk
export const getTripList = createAsyncThunk(
  "trip/getTripList",
  async (payload, apiThunk) => {
    const response = await tripApi.getAll(payload);
    response.listOfTrip.forEach((trip) => {
      trip.fldEstimateArrivalTime = trip.fldEstimateArrivalTime.substring(
        0,
        10
      );
      trip.fldEstimateStartTime = trip.fldEstimateStartTime.substring(0, 10);
    });
    return response;
  }
);

const tripSlice = createSlice({
  name: "trip",
  initialState,
  reducers: {
    getTripList(state, action) {
      state.loading = true;
    },
    getTripListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getTripList.fulfilled, (state, action) => {
      state.allTrip = action.payload;
      state.loading = false;
    });
  },
});

// Actions
export const tripActions = tripSlice.actions;

// Selectors
export const selectAllTripList = (state) => state.trip.allTrip;
export const selectTripLoading = (state) => state.trip.loading;
export const selectTripFilter = (state) => state.trip.filter;
// Reducer
const tripReducer = tripSlice.reducer;
export default tripReducer;

export function handleSearchDebounce(action) {
  return async () => {
    // dispatch(tripSlice.actions.setFilter(action.payload));
  };
}
