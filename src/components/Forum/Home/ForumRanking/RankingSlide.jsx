/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';

function NextArrow(props) {
  const { setTEST } = props;
  return (
    <div className={`${!setTEST ? 'hide' : ''}`}>
      <button
        type="button"
        className="swiper_button right"
        onClick={() => {
          console.log('test1');
        }}
      >
        <span className="a11y">우측으로</span>
      </button>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={`${!onClick ? 'hide' : ''}`}>
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
    </div>
  );
}

function RankingSlide({ children, slideCount }) {
  if (!slideCount) return null;
  const settings = {
    focusOnSelect: true,
    focusOnChange: true,
    infinite: false,
    slidesToShow: slideCount,
    slidesToScroll: slideCount - 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };
  return <Slider {...settings}>{children}</Slider>;
}

export default RankingSlide;
