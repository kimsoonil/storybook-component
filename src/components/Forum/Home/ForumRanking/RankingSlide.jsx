/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="swiper_button right"
      onClick={() => {
        onClick();
        console.log('test1');
      }}
    >
      <span className="a11y">우측으로</span>
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      type="button"
      className="swiper_button left"
      onClick={() => {
        onClick();
        console.log('test2');
      }}
    >
      <span className="a11y">좌측으로</span>
    </button>
  );
}

function RankingSlide({ children }) {
  const settings = {
    focusOnSelect: true,
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
