import { configureStore } from '@reduxjs/toolkit';
import ticketsReducer from '../redux/ducks/tickets';

const defaultTicketsState = {
  data: [
    {
      price: 100,
      carrier: 'GV',
      segments: [
        {
          origin: 'City A',
          destination: 'City B',
          date: '01:00-05:00',
          stops: ['Stop 1'],
          duration: '4h',
        },
      ],
    },
  ],
  loading: false,
  error: null,
  transferFilter: [1],
};

export const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      tickets: ticketsReducer,
    },
    preloadedState: {
      tickets: {
        ...defaultTicketsState,
        ...preloadedState,
      },
    },
  });
};
