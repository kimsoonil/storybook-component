import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LogIn from 'components/LogIn/LogIn';

function index() {
  return (
    <Routes>
      <Route path="login" element={<LogIn />} />
    </Routes>
  );
}

export default index;
