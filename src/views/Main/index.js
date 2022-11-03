/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubsRecommendInit } from 'redux/idistStore/clubSlice';
import { useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pagination, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import ScrollTopBtn from 'components/common/ScrollTopBtn';
import { Loader } from 'components/idist/Loader';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'assets/scss/main.scss';

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { recommend } = useSelector((state) => state.club);

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
    <div>
      <Header />

      <div className="slideView relative">
        <div className="slideView-title">Editor’s Club Pick</div>
        <Swiper
          spaceBetween={24}
          slidesPerView={2}
          slidesPerGroup={2}
          observer={true}
          observeParents={true}
          navigation={recommend.data.length > 0 ? true : false}
          loop={true}
          loopedSlides={4}
          loopFillGroupWithBlank={true}
          pagination={{
            clickable: true
          }}
          modules={[Pagination, Navigation]}
          // breakpoints={{
          //   1280: {
          //     slidesPerView: 2,
          //     slidesPerGroup: 2
          //   },
          //   720: {
          //     slidesPerView: 1,
          //     slidesPerGroup: 1
          //   }
          // }}
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
                  style={{ backgroundImage: `url(${recommendItem.club.profile_image_url})` }}
                />
                <div
                  className="slider-item-profileimg"
                  style={{ backgroundImage: `url(${recommendItem.club.profile_image_url})` }}
                />
                <div className="slider-item-title">{recommendItem.club.title}</div>
                <div className="slider-item-info">
                  <img src={require('images/main/icon-user-white.png')} /> {recommendItem.club.member_count}
                  <div className="color-BRONZE" style={{ marginLeft: '16px' }}>
                    BRONZE
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="main">
        <Outlet />
      </div>
      <ScrollTopBtn />
      <Footer />
    </div>
  );
}

export default Home;
