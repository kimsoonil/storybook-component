/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { reqLogIn } from 'redux/store/common/logInSlice';
// // import { showPopup, hidePopup } from 'redux/store/popupSlice';
import { useNavigate } from 'react-router-dom';
import ReCapcha from 'components/common/ReCapcha';
import useCheckLogIn from 'hook/useCheckLogIn';
import { getStorage, setStorage } from 'util/storage';
import SnsComponent from 'components/LogIn/SnsComponent';
import Footer from 'components/common/footer/Footer';
import Header from 'components/common/header/Header';
import { LOGIN_FAIL_COUNT } from 'constants/type';
import CommonInput from 'components/common/InputButton/CommonInput';
import PassWordInput from 'components/common/InputButton/PassWordInput';
import FindPasswordModal from 'components/LogIn/FindPasswordModal';

function LogIn() {
  const isAutoLogin = getStorage('autoLogin') === 'true';
  const [isFocus, setIsFocus] = useState(false);
  const [isCapcha, setIsCapcha] = useState(false);
  const [isViewPwd, setIsViewPwd] = useState(false);
  const [autoLogin, setAutoLogin] = useState(isAutoLogin);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isShowModal, setIsShowModal] = useState(false);
  const { user, loginFailCnt } = useSelector((state) => ({ ...state.logIn }));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useCheckLogIn();

  const {
    getValues,
    register,
    trigger,
    setError,
    control,
    formState: { errors }
  } = useForm({ mode: 'onBlur' });

  const watchEmail = useWatch({ control, name: 'email', defaultValue: '' });
  const watchPassword = useWatch({ control, name: 'password', defaultValue: '' });
  const { t } = useTranslation();

  const onLogIn = async () => {
    const userInfo = { username: getValues('email'), password: getValues('password') };
    if (loginFailCnt >= LOGIN_FAIL_COUNT && !isCapcha) {
      setError('verifyCapcha', { type: 'custom', message: t('validation.recapcha') });
      return;
    }
    if (
      errors.email?.type ||
      errors.password?.type ||
      errors.verifyCapcha?.type ||
      !userInfo.username ||
      !userInfo.password
    )
      return;

    dispatch(reqLogIn({ userInfo, navigate, dispatch }));
  };

  const onValidation = async () => {
    await trigger('email');
    await trigger('password');
    if (loginFailCnt >= LOGIN_FAIL_COUNT && !isCapcha) {
      setError('verifyCapcha', { type: 'custom', message: t('validation.recapcha') });
    }
  };

  useEffect(() => {
    setStorage('autoLogin', autoLogin);
  }, [autoLogin]);

  useEffect(() => {
    if (getStorage('autoLogin') === 'true') {
      // const userInfo = { username: user.username, password: user.password };
      console.log(isLogin());
      const userInfo = { username: getStorage('username'), password: getStorage('password') };
      dispatch(reqLogIn({ userInfo, navigate, dispatch }));
    }
  }, []);

  useEffect(() => {
    if (errors.email?.type || errors.password?.type || errors.verifyCapcha?.type || !watchEmail || !watchPassword)
      return;
    setIsDisabled(false);
  }, [watchEmail, watchPassword, isCapcha]);

  useEffect(() => {
    console.log('user', user);
    console.log('loginFailCnt:', loginFailCnt);
  }, [user, loginFailCnt]);

  return (
    <form>
      <div id="wrap">
        <Header />
        <div id="main">
          <div id="container">
            <div className="login_wrap">
              <div className="login_logo" />
              <div className="login_input">
                <CommonInput
                  isFocus={isFocus}
                  setIsFocus={setIsFocus}
                  errors={errors.email}
                  inputVal={getValues('email')}
                  placeholder="E-mail"
                  register={register('email', {
                    required: t('validation.require', { require: 'email' }),
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: t('validation.emailauth.email')
                    }
                  })}
                />
                <PassWordInput
                  errors={errors.password}
                  isViewPwd={isViewPwd}
                  setIsViewPwd={setIsViewPwd}
                  register={register('password', {
                    required: t('validation.require', { require: 'password' })
                  })}
                />
                <div className="form_wrap">
                  <span className="form_cell form_check">
                    <input
                      id="autoLogin"
                      name="autoLogin"
                      defaultChecked={isAutoLogin}
                      type="checkbox"
                      onClick={() => setAutoLogin(!isAutoLogin)}
                    />
                    <label htmlFor="autoLogin" className="checkbox">
                      <span>{t('label.staylogin')}</span>
                    </label>
                  </span>
                </div>
                {loginFailCnt >= LOGIN_FAIL_COUNT && <ReCapcha setIsCapcha={setIsCapcha} />}
                {errors.verifyCapcha && <span className="error_msg">{errors.verifyCapcha.message}</span>}
                <div className="page_btn_wrap full">
                  <button
                    type="button"
                    className="btn primary button_xl"
                    onClick={() => onLogIn()}
                    onBlur={() => onValidation()}
                    disabled={isDisabled}
                  >
                    <span>Login</span>
                  </button>
                </div>
                <div className="login_text_link">
                  <button type="button" onClick={() => setIsShowModal(true)}>
                    <span>Find Password</span>
                  </button>
                  <button type="button" onClick={() => navigate('/signup')}>
                    <span>Register Account</span>
                  </button>
                </div>
                <div className="login_line">
                  <span>OR</span>
                </div>
                <SnsComponent />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <FindPasswordModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
    </form>
  );
}

export default LogIn;
