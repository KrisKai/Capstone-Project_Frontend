import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tripMemberApi } from "api";

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

//thunks
export const getTripMemberList = createAsyncThunk(
  "tripMember/getTripMemberList",
  async (payload, thunkAPi) => {
    const response = await tripMemberApi.getAll(payload);
    return response;
  }
);

const tripMemberSlice = createSlice({
  name: "tripMember",
  initialState,
  reducers: {
    getTripMemberList(state, action) {
      state.loading = true;
    },

    getTripMemberListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getTripMemberList.fulfilled, (state, action) => {
      state.allMember = action.payload;
      state.loading = false;
    });
  },
});

// Actions
export const tripMemberActions = tripMemberSlice.actions;

// Selectors
export const selectAllTripMemberList = (state) => state.tripMember.allMember;
export const selectTripMemberLoading = (state) => state.tripMember.loading;
export const selectTripMemberFilter = (state) => state.tripMember.filter;
// Reducer
const tripMemberReducer = tripMemberSlice.reducer;
export default tripMemberReducer;

export function handleSearchDebounce(action) {
  return async () => {
    // dispatch(tripMemberSlice.actions.setFilter(action.payload));
  };
}
