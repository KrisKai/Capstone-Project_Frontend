import authSaga from './modules/authenticate/authSaga';
import menuSaga from './modules/menu/menuSaga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([menuSaga(), authSaga()]);
}