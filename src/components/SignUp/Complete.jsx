import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

function Complete() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [labelName, setLabelName] = useState(false);
  const { email, phoneNumber } = useSelector((state) => ({ ...state.signUp.userInfo }));

  useEffect(() => {
    if (email) setLabelName(t('label.signup.email'));
    else if (phoneNumber) setLabelName(t('label.signup.phone'));
    else setLabelName(t('label.signup.sns'));
  }, []);

  return (
    <div>
      <h1>Membership completed</h1>
      <h3>welcome. Super Club registration is complete</h3>
      <h3>
        {labelName} : {email}
      </h3>
      <h3>Nick Name : 123TESTSDF</h3>
      <div>
        <button onClick={() => navigate('/home')}>{t('label.gotomain')}</button>
        <button onClick={() => navigate('/login')}>{t('label.login')}</button>
      </div>
    </div>
  );
}

export default Complete;
