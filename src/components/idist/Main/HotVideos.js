/* eslint-disable */

import React, { useEffect } from 'react';

function HotVideos() {
  return (
    <div className="home-box hot-videos ">
      <div className="flex-between">
        <div className="clubs-title">Hot Videos</div>
        <div className="see-all">See all</div>
      </div>
      <div className="tags">
        <div className="item flex-center active">#Twice</div>
        <div className="item flex-center">#Kpop</div>
        <div className="item flex-center ">#포트리스</div>
        <div className="item flex-center">#Twice_japan</div>
        <div className="item flex-center">#POPPOP</div>
        <div className="item flex-center">#Mobile games</div>
        <div className="item flex-center">#Clan</div>
        <div className="item flex-center">#Dolphin</div>
      </div>
      <div className="video-content">
        <div className="video-list">
          {[...Array(9)].map((n, index) => (
            <div className="video-list-item" key={index}>
              <div>
                <img src={require('images/main/video-img.png')} />
              </div>
              <div className="video-list-item-content">
                <div className="video-list-item-title">FORESST.M Offical Game Club </div>
                <div className="video-list-item-info">
                  <div className="flex-center">
                    <img src={require('images/main/play.png')} />
                    <div>2M</div>
                  </div>
                  <div className="flex-center">
                    <img src={require('images/main/icon-comment.png')} />
                    <div>1k</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HotVideos;
