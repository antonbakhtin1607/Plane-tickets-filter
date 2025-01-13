import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchTicketsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTicketsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchTicketsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsFailure,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;

function fetchTicketsFromApi() {
  return fetch('../../public/test-request.json').then((response) => {
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

export function* ticketsWatcherSaga() {
  yield takeLatest(fetchTicketsRequest.type, fetchTicketsSaga);
}
