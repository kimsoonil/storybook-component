/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reqSignUp } from 'redux/store/signUpSlice';
import { reqLogIn } from 'redux/store/logInSlice';
// import { showPopup, hidePopup } from 'redux/store/popupSlice';
import { useNavigate } from 'react-router-dom';
import ReCapcha from 'components/common/ReCapcha';
import useToggle from 'hook/useToggle';
import useCheckLogIn from 'hook/useCheckLogIn';
import { getStorage, setStorage } from 'util/storage';
import { LoginSocialGoogle, LoginSocialFacebook, LoginSocialTwitter, LoginSocialApple } from 'reactjs-social-login';
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
  AppleLoginButton
} from 'react-social-login-buttons';
// import isLogin from 'util/isLogin';

const REDIRECT_URI = window.location.href;

function LogIn() {
  const isAutoLogin = getStorage('autoLogin') === 'true';
  const [isCapcha, setIsCapcha] = useState(false);
  const [autoLogin, setAutoLogin] = useToggle(isAutoLogin);
  const [provider, setProvider] = useState('');
  const [profile, setProfile] = useState(null);
  const { logIn } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useCheckLogIn();

  const {
    getValues,
    handleSubmit,
    register,
    trigger,
    formState: { isValid, errors }
  } = useForm({ mode: 'onChange' });

  const { t } = useTranslation();

  const onFormSubmit = async (userInfo) => {
    if (isCapcha && isValid) {
      dispatch(reqSignUp({ userInfo, navigate }));
    }
  };

  const onLogIn = async () => {
    const userInfo = { username: getValues('email'), password: getValues('password') };
    if (errors?.email?.type || errors?.password?.type || !userInfo.username || !userInfo.password) return;
    dispatch(reqLogIn({ userInfo, navigate, dispatch }));
  };

  const onValidation = async () => {
    await trigger('email');
    await trigger('password');
  };

  const onLoginStart = useCallback(() => {
    alert('login start');
  }, []);

  const onLogoutSuccess = useCallback(() => {
    setProfile(null);
    setProvider('');
    alert('logout success');
  }, []);

  useEffect(() => {
    setStorage('autoLogin', autoLogin);
  }, [autoLogin]);

  useEffect(() => {
    console.log('isLogin::', isLogin);
    console.log(getStorage('accessToken'));
    console.log(provider);
    console.log('profile:', profile);
  }, [profile, provider]);

  useEffect(() => {
    console.log('user info');
    console.log(logIn);
  }, [logIn]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div>
        <label htmlFor="email">
          <input
            id="email"
            type="text"
            placeholder=""
            {...register('email', {
              required: t('validation.require', { require: 'email' }),
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: t('validation.emailauth.email')
              }
            })}
          />
        </label>
        {errors.email && <small role="alert">{errors.email.message}</small>}
      </div>
      <div>
        <label htmlFor="password">
          <input
            id="password"
            type="text"
            placeholder="Password"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...register('password', {
              required: t('validation.require', { require: 'password' })
            })}
          />
        </label>
        {errors.password && <small role="alert">{errors.password.message}</small>}
      </div>
      <ReCapcha setIsCapcha={setIsCapcha} />
      <div>
        {t('label.emailauth.privacy')}
        <input name="autoLogin" defaultChecked={isAutoLogin} type="checkbox" onClick={() => setAutoLogin()} />
      </div>
      <div className={`App ${provider && profile ? 'hide' : ''}`}>
        <h1 className="title">OR</h1>
        <LoginSocialFacebook
          isOnlyGetToken
          appId="1120889868553703"
          onLoginStart={onLoginStart}
          onResolve={({ data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>

        <LoginSocialGoogle
          isOnlyGetToken
          client_id="432184681954-57sdgmg56067kvr48gg2shli7bneokqq.apps.googleusercontent.com"
          onLoginStart={onLoginStart}
          onResolve={({ data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>

        <LoginSocialApple
          client_id={process.env.REACT_APP_APPLE_ID || ''}
          scope="name email"
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <AppleLoginButton />
        </LoginSocialApple>
        <LoginSocialTwitter
          isOnlyGetToken
          client_id="4VbZUK1bABp5FDaPSYMbuwjvF"
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onResolve={({ data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <TwitterLoginButton />
        </LoginSocialTwitter>
      </div>
      <button type="submit" onClick={() => onLogIn()} onBlur={() => onValidation()}>
        LogIn
      </button>
      <button type="button" onClick={() => setStorage('accessToken', '')}>
        Delete
      </button>
    </form>
  );
}

export default LogIn;
