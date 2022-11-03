/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import banner01 from 'html/img/com/banner_img01.png';
import banner02 from 'html/img/com/banner_img02.png';
import banner03 from 'html/img/com/banner_img03.png';
import banner04 from 'html/img/com/banner_img04.png';
import Slider from 'react-slick';

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div>
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
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div>
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

function SideImgBanner() {
  const settings = {
    dots: true,
    autoplay: true,
    autoPlaySpeed: 1000,
    focusOnSelect: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="slide_banner banner swiper">
      <div className="slide_img">
        <Slider {...settings}>
          <img src={banner01} alt="test" />
          <img src={banner02} alt="test" />
          <img src={banner03} alt="test" />
          <img src={banner04} alt="test" />
        </Slider>
      </div>

      {/* <div className="slide_dot">
        <button type="button" className="dot" />
        <button type="button" className="dot on" />
        <button type="button" className="dot" />
        <button type="button" className="dot" />
      </div> */}
    </div>
  );
}

export default SideImgBanner;
