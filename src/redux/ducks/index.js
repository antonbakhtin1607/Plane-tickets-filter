import { all } from 'redux-saga/effects';

import { ticketsWatcherSaga } from './tickets';

export function* rootSaga() {
  yield all([ticketsWatcherSaga()]);
}
