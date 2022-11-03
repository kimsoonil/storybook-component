import { configureStore } from '@reduxjs/toolkit';
// import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from '@redux-saga/core';
import rootSaga from './rootSaga';
import rootReducer from './rootReducer';

const sagaMiddleware = createSagaMiddleware();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['logIn', 'forumHistory', 'authEmail', 'authCode']
};

const persistedReducer = persistReducer(persistConfig, rootReducer());

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sagaMiddleware),
  devTools: true
});

sagaMiddleware.run(rootSaga);
export default store;
