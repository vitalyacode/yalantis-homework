import { takeLatest, put, call } from 'redux-saga/effects';
import { orderByIdActions } from '../utils/constants';

import orderService from '../api/orderService';

function* fetchOrder({ payload }) {
  const { start, success, error } = orderByIdActions;
  yield put(start);

  try {
    const response = yield call(orderService.getById, `${payload}`);
    yield put(success(response));
  } catch (e) {
    yield put(error(e));
  }
}

export function* fetchOrderWatcher() {
  yield takeLatest(orderByIdActions.init, fetchOrder);
}
