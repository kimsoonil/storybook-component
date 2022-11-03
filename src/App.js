import React from 'react';
import history from 'util/history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { LogInRoute, NotLogInRoute } from 'components/common/AuthRoute';
import ScrollToTop from 'utils/scrollTop';
import AppRoutes from './AppRoutes';

const Home = loadable(() => import('components/Main'));
const Club = loadable(() => import('components/Club'));
const Forum = loadable(() => import('components/Forum'));
// const ForumPost = loadable(() => import('components/Forum/Post'));
// const ForumWriting = loadable(() => import('components/Forum/ForumWriting'));
const Nft = loadable(() => import('components/Nft'));
const Game = loadable(() => import('components/Game'));
const Dating = loadable(() => import('components/Dating'));
const PageNotFound = loadable(() => import('components/Etc/PageNotFound'));
const SignUp = loadable(() => import('components/SignUp'));
const LogIn = loadable(() => import('components/LogIn'));
const AccountManagement = loadable(() => import('components/UserInfo'));
const Chat = loadable(() => import('components/Chat/Chat'));

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/club" element={<Club />} />
          {/* <Route path="/forum/:id/post/:postId" element={<ForumPost />} />
          <Route path="/forum/:id/writing" element={<ForumWriting />} />
          <Route path="/forum/:id/writing/:postId" element={<ForumWriting />} /> */}
          <Route path="/forum/*" element={<Forum />} />
          <Route path="/nft/*" element={<Nft />} />
          <Route path="/game/*" element={<Game />} />
          <Route path="/dating/*" element={<Dating />} />
          <Route element={<LogInRoute />}>
            <Route path="/account" element={<AccountManagement />} />
          </Route>
          <Route element={<NotLogInRoute />}>
            <Route path="/account" element={<AccountManagement />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup/*" element={<SignUp />} />
          </Route>
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<AppRoutes />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
