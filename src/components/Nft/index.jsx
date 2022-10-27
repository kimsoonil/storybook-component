import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Nft from 'components/Nft/Nft';

function index() {
  return (
    <Routes>
      <Route path="/*" element={<Nft />} />
    </Routes>
  );
}

export default index;
