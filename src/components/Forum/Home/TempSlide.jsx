/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';

function TempSlide({ children }) {
  // if (!slideCount) return null;
  const settings = {
    // className: 'center',
    centerMode: true,
    infinite: true,
    arrows: false,
    // centerMargin: '0',
    slidesToShow: 3,
    cssEase: 'linear',
    slidesToScroll: 1,
    speed: 400,
    dots: true
  };
  return <Slider {...settings}>{children}</Slider>;
}

export default TempSlide;
