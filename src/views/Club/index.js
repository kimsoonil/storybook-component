/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { postsList } from '../Home/homeDate';
import Profile from '../../components/Profile';
import '../../assets/scss/club.scss';
import '../../assets/scss/reset.scss';

function Club() {
  const [searchTab, setSearchTab] = useState('All');
  return (
    <div id="root">
      <Header />
      <div className="club">
        <div className="club-banner relative">
          <div className="club-tag">
            <div className="item flex-center">#Kpop</div>
            <div className="item flex-center">#JYP</div>
            <div className="item flex-center">#Twice_Japan</div>
            <div className="item flex-center">#POPPOP</div>
          </div>
          <div className="club-profile">
            <img src={require(`../../images/club/club-banner-profile.png`)} alt="" />
          </div>
        </div>
        <div className="club-content">
          <div className="club">
            <div className="club-content-title">
              TWICE KOREA OFFICIAL{' '}
              <div className="manager">
                <div className="manager-tag flex-center">manager</div>Twice love
              </div>
            </div>
            <div className="club-content-explan">
              TWICE 대표 팬카페 Twinkle 입니다. <br /> 나연/정연/모모/사나/지효/미나/다현/채영/쯔위
            </div>
            <div className="flex-between">
              <div className="club-content-info">
                <div className="club-content-info-box">
                  <div className="club-content-info-number">125</div>
                  <div className="club-content-info-title">Memeber</div>
                </div>
                <div className="club-content-info-box">
                  <div className="club-content-info-number">420K</div>
                  <div className="club-content-info-title">Post</div>
                </div>
                <div className="club-content-info-box">
                  <div className="club-content-info-number">125</div>
                  <div className="club-content-info-title">Pin Clip</div>
                </div>
              </div>
              <div className="club-icon-btn">
                <div className="item flex-center">
                  <img src={require(`../../images/club/rank.png`)} alt="" />
                </div>
                <div className="item flex-center">
                  <img src={require(`../../images/club/club-bookmark.png`)} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="club-hr" />
        <div className="club-meun">
          <div className="club-meun-item active">Home</div>
          <div className="club-meun-item">All</div>
          <div className="club-meun-item">Notice</div>
          <div className="club-meun-item">Event</div>
          <div className="club-meun-item">Members</div>
          <div className="club-meun-item">Videos</div>
          <div className="club-meun-item">Gallery</div>
          <div className="club-meun-item">Board A</div>
          <div className="club-meun-item">Board B</div>
          <div className="club-meun-item">Board C</div>
        </div>
        <div className="club-home container">
          <div className="item">
            <div>
              <div className="club-home-title">Post</div>
              <div className="club-list-tag">
                <div className="item active flex-center">Popular</div>
                <div className="item flex-center">NEW</div>
              </div>
              <div className="club-post-list">
                {postsList.map((postsItem, index) => {
                  return (
                    <div className="club-post-list-item relative" key={index}>
                      <div className="club-post-list-item-container">
                        <div className="club-post-list-item-nick">{postsItem.nickname}</div>
                        <div className="club-post-list-item-title">{postsItem.title}</div>
                        <div className="club-post-list-item-content">{postsItem.content}</div>
                        <div className="club-post-list-item-info">
                          View {postsItem.view} ・ Comment {postsItem.comment} {postsItem.data}
                        </div>
                      </div>
                      <div className="club-post-img ">
                        <img src={require(`../../images/home/${postsItem.img}`)} alt="" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <div className="club-home-title">Gallery</div>
              <div className="club-gallery-list">
                <div className="item">
                  <img src={require(`../../images/club/gallery1.png`)} alt="" />
                </div>
                <div className="item">
                  <img src={require(`../../images/club/gallery2.png`)} alt="" />
                </div>
                <div className="item">
                  <img src={require(`../../images/club/gallery3.png`)} alt="" />
                </div>
                <div className="item">
                  <img src={require(`../../images/club/gallery4.png`)} alt="" />
                </div>
                <div className="item">
                  <img src={require(`../../images/club/gallery1.png`)} alt="" />
                </div>
                <div className="item">
                  <img src={require(`../../images/club/gallery2.png`)} alt="" />
                </div>
              </div>
            </div>
          </div>
          <div className="item">
            <Profile />
            <div className="chatting">
              <img src={require(`../../images/home/chatting.png`)} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Club;
