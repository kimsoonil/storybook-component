import React from 'react';
import history from 'util/history';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('views/Home'));

function App() {
  return (
    <div className="App">
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
