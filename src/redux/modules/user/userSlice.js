import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import userApi from "../../../api/user/userApi";

const initialState = {
  loading: false,
  allUser: {
    listOfUser: [],
    numOfUser: 0,
  },
  filter: {
    pageIndex: 0,
    pageSize: 10,
  },
  pagination: {
    pageIndex: 0,
    pageSize: 10,
    totalRows: 15,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserList(state, action) {
      state.loading = true;
    },
    getUserListSuccess(state, action) {
      state.allUser = action.payload;
      state.pagination = action.payload.pagination;
      state.loading = false;
    },
    getUserListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
});

// Actions
export const userActions = userSlice.actions;

// Selectors
export const selectAllUserList = (state) => state.user.allUser;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserFilter = (state) => state.user.filter;
export const selectUserPagination = (state) => state.user.pagination;
// Reducer
const userReducer = userSlice.reducer;
export default userReducer;

export function getUserList(action) {
  return async () => {
    try {
      // call api select list
      var url = "/users";
      const response = await userApi.getAll(action);
      dispatch(userSlice.actions.getUserListSuccess(response));
    } catch (error) {
      console.log("Failed to fetch user list", error);
      dispatch(userSlice.actions.getUserListFailed());
    }
  };
}

export function handleSearchDebounce(action) {
  return async () => {
    dispatch(userSlice.actions.setFilter(action.payload));
  };
}