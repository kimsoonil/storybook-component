import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

function Complete2() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [labelName, setLabelName] = useState(false);
  const { email, phoneNumber } = useSelector((state) => ({ ...state.signUp.userInfo }));

  useEffect(() => {
    if (email) setLabelName(t('label.email'));
    else if (phoneNumber) setLabelName(t('label.signup.phone'));
    else setLabelName(t('label.signup.sns'));
  }, []);
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
                  <span>0152_TgQW6Hyedw</span>
                  <br />* The temporary nickname granted can be modified once.
                </dd>
              </dl>
            </div>
            <button type="button" className="btn primary button_xl join_next" onClick={() => navigate('/home')}>
              <span>Getting Started</span>
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Complete2;
