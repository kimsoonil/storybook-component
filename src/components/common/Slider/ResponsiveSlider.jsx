/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={`btn_move left  ${!onClick ? 'hide' : ''}`}>
      <button type="button" className="btn_post_category left" onClick={onClick}>
        <span className="a11y">왼쪽으로 이동</span>
      </button>
    </div>
  );
}

function NextArrow(props) {
  const { onClick } = props;

  return (
    <div className={`btn_move right  ${!onClick ? 'hide' : ''}`}>
      <button type="button" className={`btn_post_category right ${!onClick ? 'hide' : ''}`} onClick={onClick}>
        <span className="a11y">오른쪽으로 이동</span>
      </button>
    </div>
  );
}

function ResponsiveSlider({ children }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 9.5,
    slidesToScroll: 8,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  return <Slider {...settings}>{children}</Slider>;
}

export default ResponsiveSlider;
