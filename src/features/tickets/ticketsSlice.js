import { createSlice } from '@reduxjs/toolkit';

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

export const { fetchTicketsRequest, fetchTicketsSuccess, fetchTicketsFailure } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;
