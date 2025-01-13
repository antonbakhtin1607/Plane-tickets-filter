import { configureStore } from '@reduxjs/toolkit';
import { all } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

import ticketsReducer, { ticketsWatcherSaga } from './ducks/tickets';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([ticketsWatcherSaga()]);
}

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
