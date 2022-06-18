import { all } from 'redux-saga/effects';
import { createOrderWatcher } from './sagas/createOrderSaga';
import { fetchOrderWatcher } from './sagas/fetchOrderSaga';

export default function* rootSaga() {
  yield all([fetchOrderWatcher(), createOrderWatcher()]);
}
