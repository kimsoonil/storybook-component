import React from 'react';
import profileTopImg from 'html/img/temp/Profile_logout.png';
import walletImg from 'html/img/temp/Wallet_layer.png';
import activityImg from 'html/img/temp/Activity_layer.png';
import collectImg from 'html/img/temp/Collect_layer.png';
import friendListImg from 'html/img/temp/Friends_list.png';
// import matchLayerImg from 'html/img/temp/Match_layer.png';
import feed01Img from 'html/img/temp/Feed_01.png';
import feed02Img from 'html/img/temp/Feed_02.png';
import feed03Img from 'html/img/temp/Feed_03.png';
import MessagesLayerImg from 'html/img/temp/Messages_layer.png';
import SuggetLayerImg from 'html/img/temp/Suggest_layer.png';
import PopularNftsImg from 'html/img/temp/Popular_nfts.png';
// import bannerCgpImg from 'html/img/temp/banner_cgp.png';

import Header from './common/header/Header';
import Footer from './common/footer/Footer';

function LoginMain() {
  return (
    <div id="wrap">
      <Header />
      <div className="top_line_banner">
        <div className="top_line_banner_con">
          <span>HELLO. 🙌🙌 WELCOME TO SUPER CLUB! BECOME AN IGP MEMBER TODAY AND ENJOY SPECIAL BENEFITS. ✨</span>
          <button type="button" className="join">
            <span>JOIN US</span>
          </button>
          <button type="button" className="close">
            <span className="a11y">닫기</span>
          </button>
        </div>
      </div>
      <div id="main">
        <div className="container temp">
          <div className="temp_left">
            <div style={{ marginBottom: 27 }}>
              <img src={profileTopImg} alt="" />
            </div>
            <div style={{ marginBottom: 27 }}>
              <img src={walletImg} alt="" />
            </div>
            <div style={{ marginBottom: 27 }}>
              <img src={activityImg} alt="" />
            </div>
            <div style={{ marginBottom: 27 }}>
              <img src={collectImg} alt="" />
            </div>
          </div>
          <div className="temp_con">
            <div>
              <img src={friendListImg} alt="" />
            </div>
            <div className="temp_main">
              <div className="temp_center">
                <div className="content_subtitle">
                  <h4 className="h4Type eng">Explore</h4>
                  <div className="title_menu">
                    <button type="button" className="hover text_btn">
                      <span>See All</span>
                    </button>
                  </div>
                </div>
                <div className="btn_category">
                  <button type="button" className="post_categoty active">
                    <span>NFTs</span>
                  </button>
                  <button type="button" className="post_categoty">
                    <span>Game</span>
                  </button>
                  <button type="button" className="post_categoty">
                    <span>Market Place</span>
                  </button>
                  <button type="button" className="post_categoty">
                    <span>Party</span>
                  </button>
                  <button type="button" className="post_categoty">
                    <span>Foodcorn</span>
                  </button>
                  <button type="button" className="post_categoty">
                    <span>OOTD</span>
                  </button>
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <img src={feed01Img} alt="" />
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <img src={feed02Img} alt="" />
                </div>
                <div>
                  <img src={feed03Img} alt="" />
                </div>
              </div>
              <div className="temp_right">
                <div style={{ paddingBottom: 28 }}>
                  <img src={MessagesLayerImg} alt="" />
                </div>
                <div style={{ paddingBottom: 28 }}>
                  <img src={SuggetLayerImg} alt="" />
                </div>
                <div>
                  <img src={PopularNftsImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default LoginMain;
