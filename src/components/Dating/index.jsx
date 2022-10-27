import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Dating from 'components/Dating/Dating';

function index() {
  return (
    <Routes>
      <Route path="/*" element={<Dating />} />
    </Routes>
  );
}

export default index;
