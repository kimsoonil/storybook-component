import axios from 'axios';
// import { showPopup } from 'redux/store/common/popupSlice';
import { reqLogOut } from 'redux/store/common/logInSlice';
import { setCookie, getCookie } from 'util/cookie';
import { UNAUTHORIZED, REFRESH_TOKEN, REFRESH_TOKEN_MAX_AGE, API_TIMEOUT_INTERVAL } from 'constants/type';
import { getStorage } from './storage';

let store;

export const axiosStore = (_store) => {
  store = _store;
};

const instance = axios.create({
  timeout: API_TIMEOUT_INTERVAL,
  baseURL: 'localhost:8080',
  headers: {
    // 'Content-Type': 'application/json; charset=utf-8',
    // 'Access-Control-Allow-Origin': '*'
    // 'Access-Control-Allow-Credentials': 'true'
    // 'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    // 'Access-Control-Allow-Headers':
    //   'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  }
});

instance.interceptors.request.use(
  (config) => {
    const locale = getStorage('lang');
    if (locale) {
      config.headers['Accept-Language'] = locale;
    }
    // add auth header with jwt if account is logged in and request is to the api url
    // const isApiUrl = config.url.startsWith(process.env.REACT_APP_API_ACCOUNT_URL);
    // const isApiPlatformUrl = config.url.startsWith(process.env.REACT_APP_API_PLATFORM_URL);
    // const { accessToken } = store.getState().logIn;
    const accessToken = getStorage('accessToken');
    // if (accessToken && (isApiUrl || isApiPlatformUrl)) config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.Authorization = accessToken && `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    const res = response;
    return res;
  },
  (error) => {
    let errResponseStatus = null;
    console.log('error:', error);
    const originalRequest = error.config;

    try {
      errResponseStatus = error.config.status;
    } catch (e) {
      console.log(e);
    }

    // access token??? ???????????? ???????????? ????????? ??????
    if ((error.message === 'Network Error' || errResponseStatus === UNAUTHORIZED) && !originalRequest.retry) {
      originalRequest.retry = true;
      const preRefreshToken = getCookie('refreshToken');
      if (preRefreshToken) {
        // refresh token??? ???????????? access token ????????? ??????
        return axios
          .post('/api/auth/token', {
            grant_type: REFRESH_TOKEN,
            refresh_token: preRefreshToken
          })
          .then((res) => {
            const { accessToken, refreshToken } = res.data;
            // ?????? ?????? token?????? ?????? ??????
            setCookie('refreshToken', refreshToken, { maxAge: REFRESH_TOKEN_MAX_AGE });
            originalRequest.headers.authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          })
          .catch(() => {
            // access token??? ???????????? ????????? ?????? ????????? logout ??????
            const { user } = store.getState().logIn;
            store.dispatch(reqLogOut({ id: user.id }));
            setCookie('refreshToken', '');
            // set accessToken
            // setStorage('accessToken', '');
            window.location.href = '/';
            return false;
          });
      }
      // ?????? ?????? ??? ?????? ?????? ?????? ??? ?????? ??????
      return Promise.reject(error);
    }
    // error popup
    // store.dispatch(
    //   showPopup({
    //     type: POPUP_TYPE_ALERT,
    //     title: error.name,
    //     contents: Object.values(error.response.data)
    //   })
    // );

    return Promise.reject(error);
  }
);

export default instance;
