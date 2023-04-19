import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authUserApi from "api/user/authenticate/authUserApi";

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
  "authUser/handleLogin",
  async (payload, thunkApi) => {
    const response = await authUserApi.login(payload);
    return response;
  }
);

export const getCurrentUser = createAsyncThunk(
  "authUser/getCurrentUser",
  async (payload, thunkApi) => {
    const response = await authUserApi.getCurrentUser();
    return response;
  }
);

export const handleRegister = createAsyncThunk(
  "authUser/register",
  async (payload, thunkApi) => {
    const response = await authUserApi.register(payload);
    return response;
  }
);

//slice
const authUserSlice = createSlice({
  name: "authUser",
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
        localStorage.removeItem("access_token_user");
        window.location.replace("/login");
      }
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.currentUser = action.payload.currentUserObj;
      state.isAuthenticated = true;
    });
  },
});

// Actions
export const authUserActions = authUserSlice.actions;

// Selectors
export const selectIsInitialized = (state) => state.auth.isInitialized;
export const selectCurrentUser = (state) => state.auth.currentUser;

// Reducer
export default authUserSlice.reducer;
