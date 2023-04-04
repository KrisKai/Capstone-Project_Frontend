import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import authApi from "../../../api/authenticate/authApi";
import { dispatch } from "../../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      state.isInitialized = true;
    },
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.isInitialized = false;
      state.currentUser = action.payload;
    },
    loginFailed(state, action) {
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
      console.log(response);
      if (response.Code != "L001") {
        dispatch(authSlice.actions.loginSuccess(response));
        // save token in localStorage
        localStorage.setItem("access_token", userToken);
        window.location.replace("/admin/dashboard")
      } else {
        dispatch(authSlice.actions.loginFailed(response));
        toast.error(response.Message, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      dispatch(authSlice.actions.loginFailed(error));
    }
  };
}
