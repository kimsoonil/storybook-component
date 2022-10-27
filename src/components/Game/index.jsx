import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Game from 'components/Game/Game';

function index() {
  return (
    <Routes>
      <Route path="/*" element={<Game />} />
    </Routes>
  );
}

export default index;
