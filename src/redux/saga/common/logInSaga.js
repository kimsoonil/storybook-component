import { takeLatest, put, fork, call, takeLeading } from 'redux-saga/effects';
import {
  reqLogIn,
  logInSuccess,
  logInFailure,
  reqLogOut,
  logOutSuccess,
  logOutFailure,
  reqAuthSns,
  authSnsSuccess,
  authSnsFailure,
  signUpAfterAutoLogin,
  updateNicknameStatus
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
import { setCookie } from 'util/cookie';
import { getStorage, setStorage } from 'util/storage';
import { fetchAuthSns, fetchLogIn1, fetchLogIn2 } from 'redux/api';
import { encryptCode } from 'util/common';

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
      navigate('/home');
      break;
    }
  }
}

function* onLoadAuthSnsAsync({ payload }) {
  try {
    const response = yield call(fetchAuthSns, payload);
    // console.log('sns saga::', response);
    // if (response.status === SUCCESS) {
    console.log(`onLoadAuthSnsAsync in:: ${response}`);

    yield put(authSnsSuccess({ ...response.data }));
    // setStorage('accessToken', response.data.accessToken);
    // }
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
  const { username, password, navigate, dispatch } = payload;
  const userInfo = { username, password: encryptCode(password) };
  try {
    const response = yield call(fetchLogIn1, userInfo);
    if (response.status === SUCCESS) {
      console.log(response);
      const { data, user } = response.data;

      const ccrLoginInfo = {
        platform: 'ccrplay',
        platformID: user.id.toString().padStart(16, '0'),
        identityToken: data.access_token
      };
      const response2 = yield call(fetchLogIn2, ccrLoginInfo);

      yield put(logInSuccess({ ...response2.data }));
      console.log(response2.data);
      const accessToken = response2.data.authToken;
      setCookie('refreshToken', accessToken, { maxAge: REFRESH_TOKEN_MAX_AGE });
      // set accessToken
      setStorage('accessToken', accessToken);
      if (getStorage('autoLogin') === 'true') {
        setStorage('username', username);
        setStorage('password', password);

        console.log('loginSaga', getStorage('username'));
        console.log('loginSaga', getStorage('password'));
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

function* onLoadSignUpAfterLoginAsync({ payload }) {
  console.log('onLoadSignUpAfterLoginAsync:', payload);
  const { navigate, accessToken, userInfo } = payload;
  try {
    yield put(signUpAfterAutoLogin({ accessToken, userInfo }));
    setStorage('accessToken', accessToken);
    navigate('/home');
  } catch (error) {
    console.log(error);
    yield put(logOutFailure(error));
  }
}

function* onLoadSignUpAfterLogin() {
  yield takeLeading(signUpAfterAutoLogin.type, onLoadSignUpAfterLoginAsync);
}

function* onLoadUpdateNicknameAsync() {
  try {
    yield put(updateNicknameStatus());
  } catch (error) {
    console.log(error);
    yield put(logOutFailure(error));
  }
}

function* onLoadUpdateNickname() {
  yield takeLeading(updateNicknameStatus.type, onLoadUpdateNicknameAsync);
}

export const logInSaga = [
  fork(onLoadAuthSns),
  fork(onLoadLogIn),
  fork(onLoadLogOut),
  fork(onLoadSignUpAfterLogin),
  fork(onLoadUpdateNickname)
];
