import { takeLatest, call, put } from 'redux-saga/effects';
import {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsFailure,
} from './ticketsSlice';
import { generateTickets } from '../../utils/generateTickets';

function* fetchTicketsSaga() {
  try {
    const response = yield call(generateTickets, 5);
    yield put(fetchTicketsSuccess(response));
  } catch (error) {
    yield put(fetchTicketsFailure(error.message));
  }
}

export default function* ticketsSaga() {
  yield takeLatest(fetchTicketsRequest.type, fetchTicketsSaga);
}
