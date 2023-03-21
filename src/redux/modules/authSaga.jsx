import { PayloadAction } from '@reduxjs/toolkit';
import { push } from 'connected-react-router';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';
import axiosInstance from '../../utils/axios'

async function* handleLogin(payload) {
  try {
    yield delay(1000);
    var url = '/login';
    const userLogin = await axiosInstance.get(url, {
      params: {
        Username: payload.get('email'),
        Password: payload.get('password')
      },
    });
    //const firebaseUser = await firebaseLogin.user?.getIdTokenResult();
    const userToken = null;
    if (!userLogin) return;
    else {
      userToken = userLogin.data.token;
    }
    //const firebaseToken = firebaseUser.token;
    console.log(userToken);
    url = "/admin";
    const response = await axiosInstance.get(url, {
      params: {
        token: userToken
      },
    });
    localStorage.setItem('access_token', userToken);
    const {
        id,
        token,
        email,
        image,
        phoneNum,
        idCard,
        city,
        district,
        address,
        fullName,
        bankName
      } = response.data;
      const user = {
        id: id,
        phoneNum: phoneNum,
        idCard: idCard,
        city: city,
        district: district,
        address: address,
        bankName: bankName,
        fullName: fullName,
        email: email,
        image: image
      };
    yield put(
      authActions.loginSuccess({
        user
      })
    );

    // redirect to admin page
    yield put(push('/auth/dashboard'));
  } catch (error) {
    yield put(authActions.loginFailed(error.message));
  }
}

function* handleLogout() {
  yield delay(500);
  localStorage.removeItem('access_token');
  // redirect to login page
  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));

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