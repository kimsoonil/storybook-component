import React from 'react';
import Header from './common/header/Header';
import Footer from './common/footer/Footer';

function Main() {
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container" />
        <Footer />
      </div>
    </div>
  );
}

export default Main;
