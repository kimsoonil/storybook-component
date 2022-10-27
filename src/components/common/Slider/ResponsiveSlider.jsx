/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import Slider from 'react-slick';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div className="btn_move left">
      <button type="button" className="btn_post_category left" onClick={onClick}>
        <span className="a11y">왼쪽으로 이동</span>
      </button>
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div className="btn_move right">
      <button type="button" className="btn_post_category right" onClick={onClick}>
        <span className="a11y">오른쪽으로 이동</span>
      </button>
    </div>
  );
}

function ResponsiveSlider({ children }) {
  const settings = {
    // focusOnSelect: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 4,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          dots: true
        }
      }
    ]
  };
  return <Slider {...settings}>{children}</Slider>;
}

export default ResponsiveSlider;
