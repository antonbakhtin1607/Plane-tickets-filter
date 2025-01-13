import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import ticketsReducer from './ducks/tickets';
import { rootSaga } from './ducks';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
