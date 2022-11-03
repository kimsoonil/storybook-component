/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import clubTopbanner01Img from 'html/img/temp/club_top_banner_01.png';
import clubTopbanner02Img from 'html/img/temp/club_top_banner_02.png';
import clubTopbanner03Img from 'html/img/temp/club_top_banner_03.png';
import newClubListImg from 'html/img/temp/New_club_list.png';
import editorsPick from 'html/img/temp/Editors_pick.png';
import ClubNewsImg from 'html/img/temp/Club_news.png';
import SuggestClub from 'html/img/temp/Suggest_club.png';
import NewFeeds from 'html/img/temp/New_feeds.png';
import ClubPopularWords from 'html/img/temp/Club_popular_words.png';
import PopularClub from 'html/img/temp/Popular_Club.png';
import chatLayer from 'html/img/temp/chat_layer.png';
import bannerByac from 'html/img/temp/banner_byac.png';
import MyClub from 'html/img/temp/My_club.png';
import ActivityLayer from 'html/img/temp/Activity_layer.png';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

function Club() {
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div className="top_slider">
          <div className="swiper">
            <button type="button" className="slide left">
              <span className="a11y">좌측으로</span>
            </button>
            <div className="img01">
              <img src={clubTopbanner01Img} alt="" />
            </div>
            <div className="img02">
              <img src={clubTopbanner02Img} alt="" />
            </div>
            <div className="img03">
              <img src={clubTopbanner03Img} alt="" />
            </div>
            <button type="button" className="slide right">
              <span className="a11y">좌측으로</span>
            </button>
            <ul className="slick-dots">
              <li>
                <button type="button" />
              </li>
              <li className="slick-active">
                <button type="button" />
              </li>
              <li>
                <button type="button" />
              </li>
              <li>
                <button type="button" />
              </li>
            </ul>
          </div>
        </div>
        <div className="container club">
          <div>
            <div className="club_list">
              <div className="club_list_title">
                <h2 className="h2Type eng">SUPER CLUB</h2>
                <div>
                  <button type="button" className="tab_box active">
                    <span>All</span>
                  </button>
                  <button type="button" className="tab_box">
                    <span>GAME</span>
                  </button>
                  <button type="button" className="tab_box">
                    <span>NFT</span>
                  </button>
                  <button type="button" className="tab_box">
                    <span>STOCK</span>
                  </button>
                  <button type="button" className="tab_box">
                    <span>MARKET</span>
                  </button>
                  <button type="button" className="tab_box">
                    <span>SNS</span>
                  </button>
                  <button type="button" className="tab_box">
                    <span>DATING</span>
                  </button>
                </div>
              </div>
              <div style={{ marginBottom: 28 }}>
                <img src={newClubListImg} alt="" />
              </div>
              <div style={{ marginBottom: 28 }}>
                <img src={editorsPick} alt="" />
              </div>
              <div className="club_list_sub">
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <img src={ClubNewsImg} alt="" />
                  </div>
                  <div>
                    <img src={SuggestClub} alt="" />
                  </div>
                </div>
                <div>
                  <div style={{ marginBottom: 28 }}>
                    <img src={NewFeeds} alt="" />
                  </div>
                  <div>
                    <img src={ClubPopularWords} alt="" />
                  </div>
                </div>
              </div>
              <div>
                <img src={PopularClub} alt="" />
              </div>
            </div>
          </div>
          <div className="right_div">
            <div style={{ marginBottom: 28 }}>
              <img src={chatLayer} alt="" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <img src={bannerByac} alt="" />
            </div>
            <div style={{ marginBottom: 28 }}>
              <img src={MyClub} alt="" />
            </div>
            <div>
              <img src={ActivityLayer} alt="" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Club;
