import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "api/admin/authenticate/authApi";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  // ---C#---
  // currentUser: {
  //   name: "",
  //   role: "",
  //   userId: "",
  // },
  // ---Java#---
  currentUserDTO: {
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

export const getcurrentUserDTO = createAsyncThunk(
  "auth/getcurrentUserDTO",
  async (payload, thunkApi) => {
    const response = await authApi.getcurrentUserDTO();
    return response;
  }
);

//slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isInitialized = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isInitialized = false;
      state.currentUserDTO = action.payload;
    },
    loginFailed(state) {
      state.isInitialized = false;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.currentUserDTO = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleLogin.fulfilled, (state, action) => {
      state.currentUserDTO = action.payload.currentUserDTO;
      state.isAuthenticated = true;
    });
    builder.addCase(getcurrentUserDTO.fulfilled, (state, action) => {
      if (action.payload === null || action.payload === "") {
        localStorage.removeItem("access_token");
        window.location.replace("/auth/login");
      }
      state.isAuthenticated = true;
      state.currentUserDTO = action.payload;
    });
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectcurrentUserDTO = (state) => state.auth.currentUserDTO;

// Reducer
export default authSlice.reducer;
