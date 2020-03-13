import {takeLatest, call, put, all} from 'redux-saga/effects';

import api from '~/services/api';

import {
  orderFetchAllSuccess,
  orderFetchAllFailure,
  orderUpdateSuccess,
  orderUpdateFailure,
} from './actions';

export function* fetchAllOrders({payload}) {
  try {
    const {page, status, deliveryman_id} = payload;

    const response = yield call(
      api.get,
      `deliveryman/${deliveryman_id}/orders`,
      {
        params: {page, status},
      },
    );

    yield put(orderFetchAllSuccess(response.data));
  } catch (err) {
    yield put(orderFetchAllFailure());
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
  takeLatest('@order/UPDATE_REQUEST', updateOrder),
]);
