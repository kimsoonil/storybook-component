import React from 'react';

import history from 'utils/history';
import './assets/scss/reset.scss';
import loadable from '@loadable/component';
import ScrollToTop from 'utils/scrollTop';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import store from 'redux/store';
import Create from 'views/Admin/Create';
import Admin from 'views/Admin';
import 'assets/scss/reset.scss';
import Dashboard from 'views/Admin/Dashboard';
import Statistics from 'views/Admin/Statistics';
import Boards from 'views/Admin/Boards';
import Posts from 'views/Admin/Posts';
import Members from 'views/Admin/Members';
import Permissions from 'views/Admin/Permissions';
import Information from 'views/Admin/Information';
import Design from 'views/Admin/Design';
import Operation from 'views/Admin/Operation';

const Home = loadable(() => import('views/Home'));
const Search = loadable(() => import('views/Search'));
const Club = loadable(() => import('views/Club'));
const ClubHome = loadable(() => import('views/Club/Home'));
const Basic = loadable(() => import('views/Club/Basic'));
const Board = loadable(() => import('views/Club/Board'));
const Notfound = loadable(() => import('views/Error/Notfound'));

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter history={history}>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/search" element={<Search />}>
              <Route path="all" element={<Search />} />
              <Route path="clubs" element={<Search />} />
              <Route path="posts" element={<Search />} />
            </Route>
            <Route path="/club/:id" element={<Club />}>
              <Route path="home" element={<ClubHome />} />
              <Route path="basic" element={<Basic />} />
              <Route path="board" element={<Board />} />
            </Route>
            <Route path="/manage" element={<Admin visibleMenu={true} />}>
              <Route path="" element={<Navigate replace to={'dashboard'} />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="boards" element={<Boards />} />
              <Route path="posts" element={<Posts />} />
              <Route path="members" element={<Members />} />
              <Route path="permissions" element={<Permissions />} />
              <Route path="information" element={<Information />} />
              <Route path="design" element={<Design />} />
              <Route path="operation" element={<Operation />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
