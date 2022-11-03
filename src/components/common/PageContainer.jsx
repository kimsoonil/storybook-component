import React from 'react';
import Header from './header/Header';
import Footer from './footer/Footer';

function PageContainer({ children, header }) {
  return (
    <div id="wrap">
      {header && <Header />}
      <div id="main">
        <div id="container">{children}</div>
        {header && <Footer />}
      </div>
    </div>
  );
}

export default PageContainer;
