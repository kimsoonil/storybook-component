/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
// import { signUpAfterAutoLogin } from 'redux/store/common/logInSlice';

function SnsComplete() {
  //   const { t } = useTranslation();
  const navigate = useNavigate();
  //   const [newNick, setNewNick] = useState('');
  const { user } = useSelector((state) => ({ ...state.logIn }));
  const { nickname } = user;

  const onLogin = () => {
    navigate('/home');
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
                  <span>ID</span>
                </dt>
                {/* <dd className="sns id">{email}</dd> */}
                <dd className={classNames('bodytitle eng p1', 'sns', 'id')}>{nickname}@google.com</dd>
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

export default SnsComplete;
