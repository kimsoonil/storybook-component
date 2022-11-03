import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Club from 'components/Club/Club';

function index() {
  return (
    <Routes>
      <Route path="/*" element={<Club />} />
    </Routes>
  );
}

export default index;
