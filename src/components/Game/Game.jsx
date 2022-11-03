/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import gamebannerImg from 'html/img/temp/Game_top_bigbanner.png';
import gamebanner01Img from 'html/img/temp/Game_top_banner_01.png';
import gamebanner02Img from 'html/img/temp/Game_top_banner_02.png';
import gamebanner03Img from 'html/img/temp/Game_top_banner_03.png';
import gamebanner04Img from 'html/img/temp/Game_top_banner_04.png';
import popularGameImg from 'html/img/temp/Popular_game.png';
import newGameImg from 'html/img/temp/New_game.png';
import chatLayer from 'html/img/temp/chat_layer.png';
import DiscountGame from 'html/img/temp/Discount_game.png';
import UpcomingGame from 'html/img/temp/Upcoming_game.png';
import BestSellerGame from 'html/img/temp/BestSeller_game.png';
import GameNews from 'html/img/temp/Game_news.png';
import GameShop from 'html/img/temp/Game_shop.png';
import UserVideo from 'html/img/temp/User_video.png';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

function Game() {
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div className="top_slider">
          <div className="game_top_banner">
            <div className="swiper game">
              <div>
                <img src={gamebannerImg} alt="" />
              </div>
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
            <ul className="game_top_right">
              <li>
                <img src={gamebanner01Img} alt="" />
              </li>
              <li>
                <img src={gamebanner02Img} alt="" />
              </li>
              <li>
                <img src={gamebanner03Img} alt="" />
              </li>
              <li>
                <img src={gamebanner04Img} alt="" />
              </li>
            </ul>
          </div>
        </div>
        <div className="main_div">
          <div id="container">
            <div className="game01">
              <div className="div953">
                <div className="game_list_title">
                  <h2 className="h2Type eng">HOT GAMES</h2>
                  <div>
                    <button type="button" className="tab_box active">
                      <span>POPULAR</span>
                    </button>
                    <button type="button" className="tab_box">
                      <span>SPECIAL</span>
                    </button>
                    <button type="button" className="tab_box">
                      <span>UPDATE</span>
                    </button>
                  </div>
                </div>
                <div style={{ marginBottom: 28 }}>
                  <img src={popularGameImg} alt="" />
                </div>
                <div>
                  <img src={newGameImg} alt="" />
                </div>
              </div>
              <div className="div299">
                <div style={{ marginBottom: 28 }}>
                  <img src={chatLayer} alt="" />
                </div>
                <div>
                  <img src={DiscountGame} alt="" />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
              <div>
                <img src={UpcomingGame} alt="" />
              </div>
              <div>
                <img src={BestSellerGame} alt="" />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
              <div>
                <img src={GameNews} alt="" />
              </div>
              <div>
                <img src={GameShop} alt="" />
              </div>
            </div>
            <div>
              <img src={UserVideo} alt="" />
            </div>
          </div>
          <div className="game_widget">
            <ul>
              <li>
                <button type="button" className="widget hot">
                  <span className="a11y" />
                </button>
              </li>
              <li>
                <button type="button" className="widget new">
                  <span className="a11y" />
                </button>
              </li>
              <li>
                <button type="button" className="widget upcoming">
                  <span className="a11y" />
                </button>
              </li>
              <li>
                <button type="button" className="widget discount">
                  <span className="a11y" />
                </button>
              </li>
              <li>
                <button type="button" className="widget best">
                  <span className="a11y" />
                </button>
              </li>
              <li>
                <button type="button" className="widget shop">
                  <span className="a11y" />
                </button>
              </li>
              <li>
                <button type="button" className="widget video">
                  <span className="a11y" />
                </button>
              </li>
              <li className="trash">
                <button type="button" className="widget">
                  <span className="a11y" />
                </button>
              </li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Game;
