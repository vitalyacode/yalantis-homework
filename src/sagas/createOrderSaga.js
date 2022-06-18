import { takeLatest, put, call } from 'redux-saga/effects';
import { createOrderActions } from '../utils/constants';

import orderService from '../api/orderService';

function* createOrder({ payload }) {
  const { start, success, error } = createOrderActions;
  yield put(start);

  try {
    const response = yield call(orderService.postOrder, payload);
    yield put(success(response));
  } catch (e) {
    yield put(error(e));
  }
}

export function* createOrderWatcher() {
  yield takeLatest(createOrderActions.init, createOrder);
}
