import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { call, delay, put, takeLatest, debounce } from "redux-saga/effects";
import { tripActions, LoginPayload } from "./tripSlice";
import axiosInstance from "../../../utils/axios";
import tripApi from "../../../api/trip/tripApi";

function* getTripList(payload) {
  try {
    yield delay(1000);
    console.log(payload);
    // call api select list
    var url = "/trips";
    const response = yield call(tripApi.getAll, payload);
    console.log(response);
    //   console.log(response.result);
    //   if (!response.result) return;
    //   const userToken = response.result.token;

    //   // save token in localStorage
    //   localStorage.setItem("access_token", userToken);
    yield put(tripActions.getTripListSuccess(response.result));
  } catch (error) {
    yield put(tripActions.getTripListFailed(error.message));
  }
}

function* handleSearchDebounce(action) {
  yield put(tripActions.setFilter(action.payload));
}

export default function* tripSaga() {
  yield takeLatest(tripActions.getTripList, getTripList);
  yield debounce(
    500,
    tripActions.setFilterWithDebounce.type,
    handleSearchDebounce
  );
}
