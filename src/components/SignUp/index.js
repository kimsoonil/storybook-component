import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { USER_INFO_EMAIL, USER_INFO_PHONE } from 'constants/type';

import Info from 'components/SignUp/Info';
import Terms from 'components/SignUp/Terms';
import Complete from 'components/SignUp/Complete';
import SnsComplete from 'components/SignUp/SnsComplete';
import AuthEmailPhone from 'components/SignUp/AuthEmail';
import SignUp from './SignUp';

function index() {
  return (
    <Routes>
      <Route path="terms/:snsType" element={<Terms />} />
      <Route path="complete" element={<Complete />} />
      <Route path="snscomplete" element={<SnsComplete />} />
      <Route path="email" element={<AuthEmailPhone reqType={USER_INFO_EMAIL} />} />
      <Route path="phone" element={<AuthEmailPhone reqType={USER_INFO_PHONE} />} />
      <Route path="info" element={<Info />} />
      <Route path="/*" element={<SignUp />} />
    </Routes>
  );
}

export default index;
