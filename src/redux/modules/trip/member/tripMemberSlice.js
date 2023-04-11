import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import { tripMemberApi } from "api";
import { setInfo } from "redux/modules/menu/menuSlice";

const initialState = {
  loading: false,
  allMember: {
    listOfMember: [],
    numOfMember: 0,
  },
  filter: {
    pageIndex: 0,
    pageSize: 10,
    memberName: "",
  },
};

const tripMemberSlice = createSlice({
  name: "tripMember",
  initialState,
  reducers: {
    getTripMemberList(state, action) {
      state.loading = true;
    },
    getTripMemberListSuccess(state, action) {
      state.allTrip = action.payload;
      state.loading = false;
    },
    getTripMemberListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
});

// Actions
export const tripMemberActions = tripMemberSlice.actions;

// Selectors
export const selectAllTripMemberList = (state) => state.tripMember.allTrip;
export const selectTripMemberLoading = (state) => state.tripMember.loading;
export const selectTripMemberFilter = (state) => state.tripMember.filter;
// Reducer
const tripMemberReducer = tripMemberSlice.reducer;
export default tripMemberReducer;

export function getTripMemberList(action) {
  return async () => {
    try {
      // call api select list
      const response = await tripMemberApi.getAll(action);
      // response.listOfTrip.forEach((trip) => {
      //   trip.fldEstimateArrivalTime = trip.fldEstimateArrivalTime.substring(
      //     0,
      //     10
      //   );
      //   trip.fldEstimateStartTime = trip.fldEstimateStartTime.substring(0, 10);
      // });
      dispatch(tripMemberSlice.actions.getTripMemberListSuccess(response));
      dispatch(setInfo(response.currentUserObj));
    } catch (error) {
      console.log("Failed to fetch trip list", error);
      dispatch(tripMemberSlice.actions.getTripMemberListFailed());
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        window.location.replace("/auth/login");
      }
    }
  };
}

export function handleSearchDebounce(action) {
  return async () => {
    dispatch(tripMemberSlice.actions.setFilter(action.payload));
  };
}
