import authSaga from './modules/authenticate/authSaga';
import menuSaga from './modules/menu/menuSaga';
import tripSaga from './modules/trip/tripSaga';
import { all } from 'redux-saga/effects';
import userSaga from './modules/user/userSaga';

export default function* rootSaga() {
  yield all([menuSaga(), authSaga(), userSaga, tripSaga()]);
}