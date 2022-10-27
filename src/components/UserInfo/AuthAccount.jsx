import React from 'react';
import { USER_INFO_EMAIL } from 'constants/type';
import AuthEmailPhone from 'components/SignUp/SignUp/AuthEmailPhone';

function AuthAccount({ reqType = USER_INFO_EMAIL }) {
  return (
    <div>
      <AuthEmailPhone reqType={reqType} />
    </div>
  );
}

export default AuthAccount;
