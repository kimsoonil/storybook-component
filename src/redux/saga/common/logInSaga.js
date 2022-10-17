import { takeLatest, put, fork, call } from 'redux-saga/effects';
import {
  reqLogIn,
  logInSuccess,
  logInFailure,
  reqLogOut,
  logOutSuccess,
  logOutFailure,
  reqAuthSns,
  authSnsSuccess,
  authSnsFailure
} from 'redux/store/common/logInSlice';
import {
  SUCCESS,
  ACCOUNT_STATUS_LEAVE,
  ACCOUNT_STATUS_LOCKED,
  ACCOUNT_STATUS_INACTIVE,
  ACCOUNT_STATUS_PASSWORD_EXPIRED,
  ACCOUNT_STATUS_SCHEDULED_TO_LEAVE,
  REFRESH_TOKEN_MAX_AGE
} from 'constants/type';
import { showPopup } from 'redux/store/common/popupSlice';
import { setCookie } from 'util/Cookie';
import { getStorage, setStorage } from 'util/storage';
import { fetchAuthSns, fetchLogIn } from '../../api';

// import Api from '../api2';

// showPopup & navigte page
function loginProcess(user, dispatch, navigate) {
  switch (user.id) {
    case ACCOUNT_STATUS_LEAVE: {
      dispatch(
        showPopup({
          title: 'LogIn',
          contents: 'scheduled to leave'
        })
      );
      break;
    }
    case ACCOUNT_STATUS_LOCKED: {
      dispatch(
        showPopup({
          title: 'LogIn',
          contents: 'unable to login'
        })
      );
      break;
    }
    case ACCOUNT_STATUS_INACTIVE: {
      dispatch(
        showPopup({
          title: 'LogIn',
          contents: 'Your account has been activated'
        })
      );
      navigate('/home');
      break;
    }
    case ACCOUNT_STATUS_PASSWORD_EXPIRED: {
      // statements;
      break;
    }
    case ACCOUNT_STATUS_SCHEDULED_TO_LEAVE: {
      dispatch(
        showPopup({
          title: 'LogIn',
          contents: 'scheduled to leave'
        })
      );
      break;
    }
    default: {
      // login success;
      // navigate('/home');
      break;
    }
  }
}

function* onLoadAuthSnsAsync({ payload }) {
  try {
    console.log(`payload:: ${payload}`);
    const response = yield call(fetchAuthSns, payload);
    if (response.status === SUCCESS) {
      console.log(`saga in:: ${payload}`);
      yield put(authSnsSuccess({ ...response.data }));
    }
    // const response = Api.reqAuthSns(payload);
    // yield put(authSnsSuccess({ ...response }));
  } catch (error) {
    console.log(error);
    yield put(authSnsFailure(error));
  }
}

function* onLoadAuthSns() {
  yield takeLatest(reqAuthSns.type, onLoadAuthSnsAsync);
}
function* onLoadLogInAsync({ payload }) {
  const { userInfo, navigate, dispatch } = payload;
  try {
    // const response = yield call(fetchAuthSns, payload);
    // const response = Api.reqLogIn(userInfo);
    const response = yield call(fetchLogIn, userInfo);
    console.log('userInfo', userInfo);
    if (response.status === SUCCESS) {
      yield put(logInSuccess({ ...response.data }));
      console.log(response);
      const { user, accessToken } = response.data;
      // set refreshToken to cookie
      setCookie('refreshToken', accessToken, { maxAge: REFRESH_TOKEN_MAX_AGE });
      // set accessToken
      setStorage('accessToken', accessToken);
      if (getStorage('autoLogin') === 'true') {
        setStorage('username', userInfo.username);
        setStorage('password', userInfo.password);
      }
      loginProcess(user, dispatch, navigate);
    }
  } catch (error) {
    console.log(error);
    // dispatch(
    //   showPopup({
    //     title: 'Test Popup',
    //     contents: error.message
    //   })
    // );
    yield put(logInFailure(error));
  }
}

function* onLoadLogIn() {
  yield takeLatest(reqLogIn.type, onLoadLogInAsync);
}

function* onLoadLogOutAsync({ payload }) {
  const { navigate } = payload;
  // const { id, navigate } = payload;
  try {
    // const response = yield call(fetchLogOut, id);
    // if (response.status === SUCCESS) {
    //   yield put(logOutSuccess({ ...response.data }));
    //   console.log(response);
    //   const { user } = response.data;
    // set refreshToken to cookie
    // }
    yield put(logOutSuccess());
    setStorage('username', '');
    setStorage('password', '');
    setStorage('accessToken', '');
    navigate('/login');
  } catch (error) {
    console.log(error);
    yield put(logOutFailure(error));
  }
}

function* onLoadLogOut() {
  yield takeLatest(reqLogOut.type, onLoadLogOutAsync);
}

export const logInSaga = [fork(onLoadAuthSns), fork(onLoadLogIn), fork(onLoadLogOut)];
