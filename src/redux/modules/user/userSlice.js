import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import userApi from "../../../api/user/userApi";
import { setInfo } from "../menu/menuSlice";

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

// Reducer
const userReducer = userSlice.reducer;
export default userReducer;

export function getUserList(action) {
  return async () => {
    try {
      // call api select list
      const response = await userApi.getAll(action);
      dispatch(userSlice.actions.getUserListSuccess(response));
      dispatch(setInfo(response.currentUserObj));
    } catch (error) {
      console.log("Failed to fetch user list", error);
      dispatch(userSlice.actions.getUserListFailed());
      if (error.response.status == 401) {
        localStorage.removeItem("access_token");
        window.location.replace("/auth/login");
      }
    }
  };
}

export function handleSearchDebounce(action) {
  return async () => {
    dispatch(userSlice.actions.setFilter(action.payload));
  };
}
