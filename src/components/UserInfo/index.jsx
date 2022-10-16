import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AccountManagement from 'components/UserInfo/AccountManagement2';

function index() {
  return (
    <Routes>
      <Route path="account" element={<AccountManagement />} />
      <Route path="/*" element={<AccountManagement />} />
    </Routes>
  );
}

export default index;
