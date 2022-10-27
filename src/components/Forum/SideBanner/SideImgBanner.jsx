/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import banner04 from 'html/img/com/banner_img04.png';

function SideImgBanner() {
  return (
    <div className="slide_banner">
      <button type="button" className="slide_btn left">
        <span className="a11y">왼쪽으로</span>
      </button>
      <div className="slide_img">
        <img src={banner04} alt="test" />
      </div>
      <button type="button" className="slide_btn right">
        <span className="a11y">오른쪽으로</span>
      </button>
      <div className="slide_dot">
        <button type="button" className="dot" />
        <button type="button" className="dot on" />
        <button type="button" className="dot" />
        <button type="button" className="dot" />
      </div>
    </div>
  );
}

export default SideImgBanner;
