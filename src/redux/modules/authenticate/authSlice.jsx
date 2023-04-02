import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../../../api/authenticate/authApi";
import { push } from "react-router-redux";
import { dispatch } from "../../store";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      console.log(1);
      state.isInitialized = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isInitialized = false;
      state.currentUser = action.payload;
      console.log(action);
    },
    loginFailed(state) {
      state.isInitialized = false;
    },

    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = undefined;
    },
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsInitialized = (state) => state.auth.isInitialized;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;

// Action
export function handleLogin(payload) {
  return async () => {
    try {
      //yield delay(1000);
      // call api login
      var url = "/authenticate/login";
      const response = await authApi.login(payload);
      const userToken = response.token;

      // save token in localStorage
      localStorage.setItem("access_token", userToken);
      dispatch(authSlice.actions.loginSuccess(response));
      window.location.replace("/admin/dashboard")
      // redirect to admin page
      //dispatch(push("/admin/dashboard"))
      //yield put(push("/admin/dashboard"));
    } catch (error) {
      dispatch(authSlice.actions.loginFailed(error.message));
    }
  };
}