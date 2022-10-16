/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red', paddingRight: '5%', zIndex: 1 }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green', paddingLeft: '5%', zIndex: 1 }}
      onClick={onClick}
      aria-hidden="true"
    />
  );
}

function RankingSlide({ children }) {
  const settings = {
    // focusOnSelect: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return <Slider {...settings}>{children}</Slider>;
}

export default RankingSlide;
