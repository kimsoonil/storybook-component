import React from 'react';
// import { useDispatch } from 'react-redux';
// import { reqAuthSns } from 'redux/store/common/logInSlice';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import { useNavigate } from 'react-router';

function SignUp() {
  const snsArr = [
    { text: 'Google', type: 'google' },
    { text: 'Twitter', type: 'twitter' },
    { text: 'Facebook', type: 'facebook' },
    { text: 'Apple', type: 'apple' }
  ];
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const snsLogin = (snsType) => {
    console.log(snsType);
    // dispatch(reqAuthSns(snsType));
  };

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
              {snsArr.map((item) => (
                <button
                  type="button"
                  className={`btn ${item.type} button_xl`}
                  key={item.type}
                  onClick={() => snsLogin(item.type)}
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
