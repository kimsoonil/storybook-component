import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from 'components/Forum/Home/Home';
import Board from 'components/Forum/Board';

function index() {
  return (
    <Routes>
      <Route path="board/:name" element={<Board />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default index;
