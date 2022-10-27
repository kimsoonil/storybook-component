/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import { signUpAfterAutoLogin } from 'redux/store/common/logInSlice';
import { checkLogin } from 'util/common';

function Complete() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [labelName, setLabelName] = useState(false);
  const { userInfo, accessToken } = useSelector((state) => ({ ...state.signUp }));
  const { email, phone, nickname } = userInfo;
  const isLogin = checkLogin();

  useEffect(() => {
    if (email) setLabelName(t('label.email'));
    else if (phone) setLabelName(t('label.signup.phone'));
    else setLabelName(t('label.signup.sns'));
  }, []);

  const onLogin = () => {
    // signup
    if (accessToken) dispatch(signUpAfterAutoLogin({ navigate, accessToken, userInfo }));
    // sns 가입
    if (isLogin && !accessToken) navigate('/home');
  };

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="login_wrap">
            <div className="join_end" />
            <div className="signup">
              <h3 className="h3Type eng">SIGN UP COMPLETED</h3>
              <span>
                Welcome! SUPER CLUB registration is complete.
                <br />
                Check out convenient and fun services after Log in.
              </span>
            </div>
            <div className="end_info">
              <dl>
                <dt>
                  <span>{labelName}</span>
                </dt>
                <dd className="sns id">{email}</dd>
              </dl>
              <dl>
                <dt>
                  <span>Nickname</span>
                </dt>
                <dd className="nick">
                  <span>{nickname}</span>
                  <br />* The temporary nickname granted can be modified once.
                </dd>
              </dl>
            </div>
            <button type="button" className="btn primary button_xl join_next" onClick={onLogin}>
              <span>Getting Started</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Complete;
