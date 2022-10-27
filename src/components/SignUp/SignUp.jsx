import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, setStorage } from 'util/storage';
import { useDispatch, useSelector } from 'react-redux';
import { reqAuthSns, signUpAfterAutoLogin } from 'redux/store/common/logInSlice';
import { SNS_GOOGLE, SNS_APPLE, SNS_FACEBOOK, SNS_TWITTER } from 'constants/type';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

function SignUp() {
  const arrSns = [
    { id: SNS_GOOGLE, name: 'Google' },
    { id: SNS_APPLE, name: 'Apple' },
    { id: SNS_FACEBOOK, name: 'Meta' },
    { id: SNS_TWITTER, name: 'Twitter' }
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const snsLogin = (snsType) => {
    console.log(snsType);
    dispatch(reqAuthSns(snsType));
  };
  const { isAuthSns } = useSelector((state) => ({ ...state.logIn }));

  useEffect(() => {
    console.log('isAuthSns', isAuthSns);
    // setStorage('google', '');
    if (isAuthSns) {
      window.addEventListener('message', (e) => {
        if (e.data.message === 'passport-login-success' && e.data.source === 'platform-login-api') {
          const { platforms, authToken } = e.data.data;
          setStorage('accessToken', authToken);

          if (getStorage(platforms[0]?.type) !== 'true') navigate('/signup/complete');
          else dispatch(signUpAfterAutoLogin(e.data.data));
          // window.localStorage.setItem('token', e.data.data.authToken);
          // e.data.data.platforms: 바인딩된 플랫폼 배열 (ccr, google, apple, facebook, twitter)
          // e.data.data.userInfo
        }
      });
    }
  }, [isAuthSns]);

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="login_wrap">
            <div className="login_logo" />
            <div className="join_text">
              <h4 className="h4Type eng">BEST COMMUNITY IN MY LIFE</h4>
              <span>Create together with the people of the world.</span>
            </div>
            <div className="btn_group">
              <div>
                <button type="button" className="btn primary button_xl" onClick={() => navigate('email')}>
                  <span>Sign up with E-mail</span>
                </button>
                <div className="login_line">
                  <span>OR</span>
                </div>
              </div>
              {arrSns.map((item) => (
                <button
                  type="button"
                  className={`btn ${item.id} button_xl`}
                  key={item.id}
                  onClick={() => snsLogin(item.id)}
                >
                  <span>Continue with {item.text}</span>
                </button>
              ))}
            </div>
            <div className="join_link">
              <span>Already a membership?</span>
              <a href="login" className="color">
                Login
              </a>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SignUp;
