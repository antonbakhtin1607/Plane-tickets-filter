import { createSlice } from '@reduxjs/toolkit';
import { takeLatest, call, put } from 'redux-saga/effects';

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    data: [],
    loading: false,
    error: null,
    transferFilter: [],
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
    setTransferFilter: (state, action) => {
      state.transferFilter = action.payload;
    },
    sortTicketsByPrice: (state) => {
      state.data = state.data.sort((a, b) => a.price - b.price);
    },
    sortTicketsByFastest: (state) => {
      state.data = [...state.data].sort((a, b) => {
        const totalDurationA = a.segments.reduce(
          (acc, segment) => acc + parseDuration(segment.duration),
          0
        );
        const totalDurationB = b.segments.reduce(
          (acc, segment) => acc + parseDuration(segment.duration),
          0
        );
        return totalDurationA - totalDurationB;
      });
    },
  },
});

const parseDuration = (duration) => {
  const [hours, minutes] = duration
    .split('h ')
    .map((part) => parseInt(part, 10));
  return hours * 60 + minutes;
};

export const {
  fetchTicketsRequest,
  fetchTicketsSuccess,
  fetchTicketsFailure,
  setTransferFilter,
  sortTicketsByPrice,
  sortTicketsByFastest,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;

function fetchTicketsFromApi() {
  return fetch('/test-request.json').then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  });
}

function* fetchTicketsSaga() {
  try {
    const response = yield call(fetchTicketsFromApi);
    yield put(fetchTicketsSuccess(response));
  } catch (error) {
    yield put(fetchTicketsFailure(error.message));
  }
}

export function* ticketsWatcherSaga() {
  yield takeLatest(fetchTicketsRequest.type, fetchTicketsSaga);
}

export const selectFilteredTickets = (state) => {
  const { data, transferFilter } = state.tickets;
  if (transferFilter.length === 0) {
    return data;
  }
  return data.filter((ticket) =>
    ticket.segments.every((segment) =>
      transferFilter.includes(segment.stops.length)
    )
  );
};
