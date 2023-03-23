import { takeEvery } from "redux-saga/effects";

export function* log(action) {
    console.log('Log', action);
}

export default function* menuSaga() {
  yield takeEvery("*", log);
}
