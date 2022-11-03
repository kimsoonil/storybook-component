import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from 'components/Forum/Home/Home';
import Create from 'components/Forum/Create/Create';
import Edit from 'components/Forum/Create/Edit';
import InitSetting from 'components/Forum/Create/InitSetting';
import Theme from 'components/Forum/Theme/Theme';
import ForumPost from 'components/Forum/Post';
import ForumWriting from 'components/Forum/ForumWriting';
import TransferAuth from './Theme/TransferAuth';

function index() {
  return (
    <Routes>
      <Route path=":id/theme" element={<Theme />} />
      <Route path=":id/init" element={<InitSetting />} />
      <Route path=":id/auth" element={<TransferAuth />} />
      <Route path=":id/edit" element={<Edit />} />
      <Route path="create" element={<Create />} />
      <Route path=":id/post/:postId" element={<ForumPost />} />
      <Route path=":id/writing" element={<ForumWriting />} />
      <Route path=":id/writing/:postId" element={<ForumWriting />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default index;
