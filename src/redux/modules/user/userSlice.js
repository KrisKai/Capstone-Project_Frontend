import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "api/user/userApi";

const initialState = {
  loading: false,
  allUser: {
    listOfUser: [],
    numOfUser: 0,
  },
  filter: {
    pageIndex: 0,
    pageSize: 10,
    userName: ""
  },
};

//thunk
export const getUserList = createAsyncThunk(
  "user/getUserList",
  async (payload, thunkApi) => {
    const response = await userApi.getAll(payload);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUserList(state, action) {
      state.loading = true;
    },

    getUserListFailed(state) {
      state.loading = false;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setFilterWithDebounce(state, action) {},
  },
  extraReducers: (builder) => {
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.allUser = action.payload;
      state.loading = false;
    });
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

export function handleSearchDebounce(action) {
  return async () => {
    // dispatch(userSlice.actions.setFilter(action.payload));
  };
}
