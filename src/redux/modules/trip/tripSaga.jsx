import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, fork, put, take } from "redux-saga/effects";
import { tripActions, LoginPayload } from "./tripSlice";
import axiosInstance from "../../../utils/axios";
import authApi from "../../../api/authenticate/authApi";

function* selectTripList(payload) {
  try {
  //   yield delay(1000);
  //   console.log(payload);

  //   // call api login
  //   var url = "/authenticate/login";
  //   const response = yield call(authApi.login, payload);
  //   console.log(response.result);
  //   if (!response.result) return;
  //   const userToken = response.result.token;

  //   // save token in localStorage
  //   localStorage.setItem("access_token", userToken);
  //   yield put(authActions.loginSuccess(response.result));

  //   // redirect to admin page
  //   yield put(push("/admin/dashboard"));
  } catch (error) {
    yield put(tripActions.loginFailed(error.message));
  }
}

export default function* tripSaga(){};
