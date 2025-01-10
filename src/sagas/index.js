import { all } from 'redux-saga/effects';
import ticketsSaga from '../features/tickets/ticketsSaga';

export default function* rootSaga() {
  yield all([ticketsSaga()]);
}
