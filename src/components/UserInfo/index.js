import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PageContainer from 'components/common/PageContainer';
import AccountManagement from 'components/UserInfo/AccountManagement';

function index(props) {
  return (
    <PageContainer {...props}>
      <Routes>
        <Route path="account" element={<AccountManagement />} />
        <Route path="/*" element={<AccountManagement />} />
      </Routes>
    </PageContainer>
  );
}

export default index;
