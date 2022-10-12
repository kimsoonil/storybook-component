import './App.css';
import React from 'react';
import history from 'util/history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import loadable from '@loadable/component';
import { LogInRoute, NotLogInRoute } from 'components/common/AuthRoute';
import ScrollToTop from 'utils/scrollTop';
import AppRoutes from './AppRoutes';

const Home = loadable(() => import('components/Movie/Home'));
const Movie = loadable(() => import('components/Movie/Movie'));
const PageNotFound = loadable(() => import('components/Etc/PageNotFound'));
const SignUp = loadable(() => import('components/SignUp'));
const LogIn = loadable(() => import('components/LogIn/LogIn'));
const AccountManagement = loadable(() => import('components/UserInfo/AccountManagement'));

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/home" element={<Home />} />
          <Route element={<LogInRoute />}>
            <Route path="/account" element={<AccountManagement />} />
          </Route>
          <Route element={<NotLogInRoute />}>
            <Route path="/login/*" element={<LogIn />} />
            <Route path="/signup/*" element={<SignUp />} />
          </Route>
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
          <Route path="*" element={<AppRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
