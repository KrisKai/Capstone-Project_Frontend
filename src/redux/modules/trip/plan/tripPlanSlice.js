import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tripPlanApi } from "api";

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

//thunks
export const getTripPlanList = createAsyncThunk(
  "tripPlan/getTripPlanList",
  async (payload, thunkApi) => {
    const response = await tripPlanApi.getAll(payload);
    return response;
  }
);

const tripPlanSlice = createSlice({
  name: "tripPlan",
  initialState,
  reducers: {
    getTripPlanList(state, action) {
      state.loading = true;
    },

    getTripPlanListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getTripPlanList.fulfilled, (state, action) => {
      state.allPlan = action.payload;
      state.loading = false;
    });
  },
});

// Actions
export const tripPlanActions = tripPlanSlice.actions;

// Selectors
export const selectAllTripPlanList = (state) => state.tripPlan.allPlan;
export const selectTripPlanLoading = (state) => state.tripPlan.loading;
export const selectTripPlanFilter = (state) => state.tripPlan.filter;
// Reducer
const tripPlanReducer = tripPlanSlice.reducer;
export default tripPlanReducer;

export function handleSearchDebounce(action) {
  return async () => {
    // dispatch(tripPlanSlice.actions.setFilter(action.payload));
  };
}
