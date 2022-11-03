import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorage, setStorage } from 'util/storage';
import { useDispatch, useSelector } from 'react-redux';
import { reqAuthSns, signUpAfterAutoLogin } from 'redux/store/common/logInSlice';
import { SNS_GOOGLE, SNS_APPLE, SNS_FACEBOOK, SNS_TWITTER } from 'constants/type';

function SnsComponent() {
  const arrSns = [
    { id: SNS_GOOGLE, name: 'Google' },
    { id: SNS_APPLE, name: 'Apple' },
    { id: SNS_FACEBOOK, name: 'Meta' },
    { id: SNS_TWITTER, name: 'Twitter' }
  ];

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthSns } = useSelector((state) => ({ ...state.logIn }));

  const snsLogin = (snsType) => {
    if (getStorage(snsType) === 'true') dispatch(reqAuthSns(snsType));
    else navigate(`/signup/terms/${snsType}`);
  };

  useEffect(() => {
    console.log('isAuthSns', isAuthSns);
    // setStorage('google', '');
    if (isAuthSns) {
      window.addEventListener('message', (e) => {
        if (e.data.message === 'passport-login-success' && e.data.source === 'platform-login-api') {
          const { platforms, authToken, userInfo } = e.data.data;
          console.log('authToken', authToken);
          setStorage('accessToken', authToken);

          if (getStorage(platforms[0]?.type) !== 'true') navigate('/signup/complete');
          else dispatch(signUpAfterAutoLogin({ navigate, accessToken: authToken, userInfo }));
          // window.localStorage.setItem('token', e.data.data.authToken);
          // e.data.data.platforms: 바인딩된 플랫폼 배열 (ccr, google, apple, facebook, twitter)
          // e.data.data.userInfo
        }
      });
    }
  }, [isAuthSns]);
  return (
    <div className="sns_login">
      {arrSns.map((item) => (
        <button
          type="button"
          className={`sns btn_${item.id}`}
          onClick={() => snsLogin(item.id)}
          key={item.id}
          aria-hidden="true"
        >
          <span className="a11y">{item.name}</span>
        </button>
      ))}
    </div>
  );
}

export default SnsComponent;
