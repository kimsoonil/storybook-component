import React from 'react';
import history from 'util/history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/scss/reset.scss';

const Home = React.lazy(() => import('views/Home'));
const Search = React.lazy(() => import('views/Search'));
const Club = React.lazy(() => import('views/Club'));

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/club" element={<Club />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
