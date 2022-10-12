import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { USER_INFO_EMAIL, USER_INFO_PHONE } from 'constants/type';

import SignUp from 'components/SignUp/SignUp/SignUp';
import Info from 'components/SignUp/Info';
import Terms from 'components/SignUp/Terms';
import Complete from 'components/SignUp/Complete';
import AuthEmailPhone from 'components/SignUp/SignUp/AuthEmailPhone';

function index() {
  return (
    <Routes>
      <Route path="email" element={<AuthEmailPhone reqType={USER_INFO_EMAIL} />} />
      <Route path="phone" element={<AuthEmailPhone reqType={USER_INFO_PHONE} />} />
      <Route path="info" element={<Info />} />
      <Route path="terms" element={<Terms />} />
      <Route path="complete" element={<Complete />} />
      <Route path="/*" element={<SignUp />} />
    </Routes>
  );
}

export default index;
