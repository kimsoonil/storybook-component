import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import 'html/css/style.css';
import { axiosStore } from 'util/axios.config';
import Popup from 'components/common/Popup/Popup';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import 'assets/font/font.css';
// import './i18n';

axiosStore(store);
const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
      <Popup />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
