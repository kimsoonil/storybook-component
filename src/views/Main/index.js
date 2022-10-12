/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubsRecommendInit } from 'redux/idistStore/clubSlice';
import { useNavigate, Outlet } from 'react-router-dom';

import { Header } from 'components/idist/Header';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components/idist/Loader';
import Slider from 'react-slick';

// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import 'assets/scss/slick.scss';
import 'assets/scss/slick-theme.scss';
import 'assets/scss/main.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { recommend } = useSelector((state) => state.club);
  const pathname = window.location.pathname.split('/');
  const clubsTabArr = [
    { url: '', title: 'Home' },
    { url: 'myclubs', title: 'My Clubs' },
    { url: 'newfeeds', title: 'New Feeds' },
    { url: 'activity', title: 'Activity' }
  ];

  const seachFunc = () => {
    navigate('/clubs/search/all');
  };
  useEffect(() => {
    dispatch(getClubsRecommendInit({ parameters: '' }));
  }, [dispatch]);

  const settings = {
    dots: true,
    className: 'slider',
    centerMode: true,
    infinite: true,
    centerPadding: '300px',
    slidesToShow: 2,
    slidesToSlide: 2,
    swipeToSlide: true,
    speed: 500
  };

  if (recommend.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div id="root">
      <Header seachFunc={seachFunc} user={{}} />

      <div className="slideView relative">
        <div className="slideView-title">Editor’s Club Pick</div>
        <Slider {...settings}>
          {recommend.data.map((recommendItem, index) => {
            return (
              <div key={index} className="slider-item" onClick={() => navigate(`/club/${recommendItem.club.id}/home`)}>
                <div
                  className="slider-item-img"
                  style={{ backgroundImage: `url(${recommendItem.club.thumbnail_image_url})` }}
                />
                <div
                  className="slider-item-profileimg"
                  style={{ backgroundImage: `url(${recommendItem.club.profile_image_url})` }}
                />
                <div className="slider-item-title">{recommendItem.club.name}</div>
                <div className="slider-item-info">Member 1 • BRONZE</div>
              </div>
            );
          })}
        </Slider>
      </div>
      <div className="main">
        <div className="clubs-tap">
          {clubsTabArr.map((item, index) => {
            if (pathname[2] === undefined) {
              pathname[2] = '';
            }
            return (
              <div
                className={'item ' + (pathname[2] === item.url && 'active')}
                key={index}
                onClick={() => navigate(`${item.url}`)}
              >
                {item.title}
              </div>
            );
          })}
        </div>

        <Outlet />
      </div>
    </div>
  );
}

export default Home;
