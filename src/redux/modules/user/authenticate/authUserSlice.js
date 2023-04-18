import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/authenticate/authApi";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  currentUser: {
    name: "",
    role: "",
    userId: "",
  },
};

//thunk
export const handleLogin = createAsyncThunk(
  "auth/handleLogin",
  async (payload, thunkApi) => {
    const response = await authApi.login(payload);
    return response;
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (payload, thunkApi) => {
    const response = await authApi.getCurrentUser();
    return response;
  }
);

//slice
const authUserSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isInitialized = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isInitialized = false;
      state.currentUser = action.payload;
    },
    loginFailed(state) {
      state.isInitialized = false;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUserObj;
      state.isAuthenticated = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      if (action.payload === null || action.payload === "") {
        localStorage.removeItem("access_token");
        window.location.replace("/auth/login");
      }
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });
  },
});

// Actions
export const authActions = authUserSlice.actions;

// Selectors
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectCurrentUser = (state) => state.auth.currentUser;

// Reducer
export default authUserSlice.reducer;
