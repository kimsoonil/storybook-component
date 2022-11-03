/* eslint-disable */

import React, { useEffect, useState } from 'react';
import 'assets/scss/common.scss';

function ScrollTopBtn() {
  const [isInnerHeight, setIsInnerHeight] = useState(false);
  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };
  function handleUserScroll() {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > innerHeight) {
      setIsInnerHeight(true);
    } else {
      setIsInnerHeight(false);
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, []);

  if (isInnerHeight)
    return (
      <div className="scrollTop flex-center" onClick={() => scrollTop()}>
        <img src={require('images/main/arrow-top.png')} />
      </div>
    );
}

export default ScrollTopBtn;
