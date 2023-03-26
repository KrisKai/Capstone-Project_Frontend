import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { authActions, LoginPayload } from "./authSlice";
import axiosInstance from "../../../utils/axios";
import authApi from "../../../api/authApi";
import { Navigate, useLocation } from 'react-router-dom';

function* handleLogin(payload) {
  try {
    yield delay(1000);
    console.log(payload);

    // call api login
    var url = "/authenticate/login";
    const response = yield call(authApi.login, payload);
    console.log(response.result);
    if (!response.result) return;
    const userToken = response.result.token;

    // save token in localStorage
    localStorage.setItem("access_token", userToken);
    yield put(authActions.loginSuccess(response.result));

    // redirect to admin page
    yield put(push("/admin/dashboard"));
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem("access_token");
  // redirect to login page
  yield put(push("/auth/login"));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));

    if (!isLoggedIn) {
      const action = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
