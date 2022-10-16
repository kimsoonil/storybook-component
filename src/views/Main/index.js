/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubsRecommendInit } from 'redux/idistStore/clubSlice';
import { useNavigate, Outlet } from 'react-router-dom';
import Header from 'components/common/header/Header';
// import { Header } from 'components/idist/Header';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import { useTranslation } from 'react-i18next';
import { Loader } from 'components/idist/Loader';

import Footer from 'components/common/footer/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
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

  if (recommend.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div id="root">
      {/* <Header seachFunc={seachFunc} user={{}} /> */}
      <Header />

      <div className="slideView relative">
        <div className="slideView-title">Editor’s Club Pick</div>
        <Swiper
          spaceBetween={24}
          slidesPerView={2}
          slidesPerGroup={2}
          observer={true}
          observeParents={true}
          navigation={true}
          loop={true}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true
          }}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1280: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            720: {
              slidesPerView: 1,
              slidesPerGroup: 1
            }
          }}
        >
          {recommend.data.map((recommendItem, index) => {
            return (
              <SwiperSlide
                key={index}
                className="slider-item"
                onClick={() => navigate(`/club/${recommendItem.club.id}/home`)}
              >
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
              </SwiperSlide>
            );
          })}
        </Swiper>
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
      <Footer />
    </div>
  );
}

export default Home;
