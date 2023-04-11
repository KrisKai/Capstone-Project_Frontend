import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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

//thunks
export const getTripRoleList = createAsyncThunk(
  "tripRole/gettripRoleList",
  async (payload, thunkApi) => {
    const response = await tripRoleApi.getAll(payload);
    return response;
  }
);

const tripRoleSlice = createSlice({
  name: "tripRole",
  initialState,
  reducers: {
    getTripRoleList(state, action) {
      state.loading = true;
    },
    getTripRoleListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getTripRoleList.fulfilled, (state, action) => {
      state.allRole = action.payload;
      state.loading = false;
    });
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

export function handleSearchDebounce(action) {
  return async () => {
    // dispatch(tripRoleSlice.actions.setFilter(action.payload));
  };
}
