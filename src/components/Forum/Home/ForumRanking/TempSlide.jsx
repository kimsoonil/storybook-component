/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';

function TempSlide({ children, slideCount }) {
  if (!slideCount) return null;
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 8,
    speed: 500,
    dots: true
  };
  return <Slider {...settings}>{children}</Slider>;
}

export default TempSlide;
