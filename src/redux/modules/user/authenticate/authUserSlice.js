import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authUserApi from "api/user/authenticate/authUserApi";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  currentUserDTO: {
    name: "",
    role: "",
    userId: "",
  },
};

//thunk
export const handleLogin = createAsyncThunk(
  "authUser/handleLogin",
  async (payload, thunkApi) => {
    const response = await authUserApi.loginUser(payload);
    return response;
  }
);

export const getcurrentUserDTO = createAsyncThunk(
  "authUser/getcurrentUserDTO",
  async (payload, thunkApi) => {
    const response = await authUserApi.getcurrentUserDTO();
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
        localStorage.removeItem("access_token_user");
        window.location.replace("/login");
      }
      state.isAuthenticated = true;
      state.currentUserDTO = action.payload;
    });
    builder.addCase(handleRegister.fulfilled, (state, action) => {
      state.currentUserDTO = action.payload.currentUserDTO;
      state.isAuthenticated = true;
    });
  },
});

// Actions
export const authUserActions = authUserSlice.actions;

// Selectors
export const selectIsInitialized = (state) => state.authUser.isInitialized;
export const selectcurrentUserDTO = (state) => state.authUser.currentUserDTO;

// Reducer
export default authUserSlice.reducer;
