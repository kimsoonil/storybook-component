import React from 'react';
import history from 'util/history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/scss/reset.scss';
import loadable from '@loadable/component';
import ScrollToTop from 'util/scrollTop';

const Home = loadable(() => import('views/Home'));
const Search = loadable(() => import('views/Search'));
const Club = loadable(() => import('views/Club'));
const Notfound = loadable(() => import('views/Error/Notfound'));

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/club" element={<Club />} />
          <Route path="/club/:id" element={<Club />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
