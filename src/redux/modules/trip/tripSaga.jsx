import { call, delay, put, takeLatest, debounce } from "redux-saga/effects";
import { tripActions, LoginPayload } from "./tripSlice";
import tripApi from "../../../api/trip/tripApi";

function* getTripList(action) {
  try {
    // call api select list
    var url = "/trips";
    const response = yield call(tripApi.getAll, action.payload);
    yield put(tripActions.getTripListSuccess(response));
  } catch (error) {
    console.log('Failed to fetch trip list', error);
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
