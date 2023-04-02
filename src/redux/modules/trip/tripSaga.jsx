import { tripApi } from "api";
import { call, debounce, put, takeLatest } from "redux-saga/effects";
import { tripActions } from "./tripSlice";

function* getTripList(action) {
  try {
    // call api select list
    var url = "/trips";
    const response = yield call(tripApi.getAll, action.payload);
    yield put(tripActions.getTripListSuccess(response));
  } catch (error) {
    console.log("Failed to fetch trip list", error);
    yield put(tripActions.getTripListFailed());
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
