import { takeLatest, call, put } from 'redux-saga/effects';

import {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsFailure,
} from './ticketsSlice';

function fetchTicketsFromApi() {
  return fetch('../../../public/test-request.json').then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

function* fetchTicketsSaga() {
  try {
    const response = yield call(fetchTicketsFromApi);
    yield put(fetchTicketsSuccess(response.slice(0, 5)));
  } catch (error) {
    yield put(fetchTicketsFailure(error.message));
  }
}

export default function* ticketsSaga() {
  yield takeLatest(fetchTicketsRequest.type, fetchTicketsSaga);
}
