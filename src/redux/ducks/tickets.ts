import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { takeLatest, call, put, Effect } from 'redux-saga/effects';

export type Segment = {
  origin: string;
  destination: string;
  date: string;
  stops: string[];
  duration: string;
};

export type Ticket = {
  price: number;
  carrier: string;
  segments: Segment[];
};

type TicketsState = {
  data: Ticket[];
  loading: boolean;
  error: string | null;
  transferFilter: number[];
};

const initialState: TicketsState = {
  data: [],
  loading: false,
  error: null,
  transferFilter: [],
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    fetchTicketsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchTicketsSuccess: (state, action: PayloadAction<Ticket[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchTicketsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setTransferFilter: (state, action: PayloadAction<number[]>) => {
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

const parseDuration = (duration: string): number => {
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

function* fetchTicketsSaga(): Generator<Effect, void, Ticket[]> {
  try {
    const response = yield call(fetchTicketsFromApi);
    yield put(fetchTicketsSuccess(response));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchTicketsFailure(error.message));
    } else {
      yield put(fetchTicketsFailure('An unknown error occurred'));
    }
  }
}

export function* ticketsWatcherSaga() {
  yield takeLatest(fetchTicketsRequest.type, fetchTicketsSaga);
}

export const selectFilteredTickets = (state: { tickets: TicketsState }) => {
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
