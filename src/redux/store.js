import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import ticketsReducer from './tickets/ticketsSlice';
import ticketsSaga from './tickets/ticketsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(ticketsSaga);

export default store;
