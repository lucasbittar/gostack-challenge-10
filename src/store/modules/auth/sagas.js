import {Alert} from 'react-native';
import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '~/services/api';

import {loginSuccess, loginFailure} from './actions';

export function* login({payload}) {
  try {
    console.tron.log('PAYLOAD', payload);
    const {deliveryman_id} = payload;

    const response = yield call(api.post, 'sessions?mobile=1', {
      deliveryman_id,
    });

    const {token, user} = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(loginSuccess(token, user));
    // history.push('/orders');
  } catch (err) {
    yield put(loginFailure());
    Alert.alert(
      'Verification error',
      'Make sure you typed in your ID correctly.',
    );
  }
}

export function setToken({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function logout() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/LOGIN_REQUEST', login),
  takeLatest('@auth/LOGOUT', logout),
]);
