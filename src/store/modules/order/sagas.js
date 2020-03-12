import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '~/services/api';

import {
  orderFetchAllSuccess,
  orderFetchAllFailure,
  orderFetchSuccess,
  orderFetchFailure,
  orderUpdateSuccess,
  orderUpdateFailure,
} from './actions';

export function* fetchAllOrders({payload}) {
  try {
    const {page, deliveryman_id} = payload;

    const response = yield call(
      api.get,
      `deliveryman/${deliveryman_id}/orders`,
      {
        params: {page},
      },
    );

    yield put(orderFetchAllSuccess(response.data));
  } catch (err) {
    yield put(orderFetchAllFailure());
  }
}

export function* fetchOrder({payload}) {
  try {
    const {id} = payload;

    const response = yield call(api.get, `orders/${id}`);

    yield put(orderFetchSuccess(response.data));
  } catch (err) {
    yield put(orderFetchFailure());
  }
}

export function* updateOrder({payload}) {
  try {
    const {id, product, deliveryman_id, recipient_id} = payload;

    const response = yield call(api.put, `orders/${id}`, {
      recipient_id,
      deliveryman_id,
      product,
    });

    yield put(orderUpdateSuccess(response.data));
  } catch (err) {
    yield put(orderUpdateFailure());
  }
}

export default all([
  takeLatest('@order/FETCH_ALL_REQUEST', fetchAllOrders),
  takeLatest('@order/FETCH_REQUEST', fetchOrder),
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
