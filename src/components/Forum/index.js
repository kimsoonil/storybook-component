import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from 'components/Forum/Home/Home';
import Board from 'components/Forum/Board';
import Create from 'components/Forum/Create/Create';
import Edit from 'components/Forum/Create/Edit';
import InitSetting from 'components/Forum/Create/InitSetting';
import Theme from 'components/Forum/Theme/Theme';
import Post from 'components/Forum/Post/Post';
import TransferAuth from './Theme/TransferAuth';

function index() {
  return (
    <Routes>
      <Route path="board/:name" element={<Board />} />
      <Route path="theme/:id" element={<Theme />} />
      <Route path="init/:id" element={<InitSetting />} />
      <Route path="auth/:id" element={<TransferAuth />} />
      <Route path="edit/:id" element={<Edit />} />
      <Route path="create" element={<Create />} />
      <Route path="post" element={<Post />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default index;
