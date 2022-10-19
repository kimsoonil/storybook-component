import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
  devTools: true
});

sagaMiddleware.run(rootSaga);
export default store;
