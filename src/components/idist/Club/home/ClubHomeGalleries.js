/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ClubHomeGalleries() {
  return (
    <div className="club-home-content gallery">
      <div className="flex-between">
        <div className="club-home-title">Galleries</div>
        <div className="see-all">See all</div>
      </div>
      <div className="club-list-tag">
        <div className="list-filter flex-center">
          <div className="flex-center active">Hot</div>
          <div className="flex-center">Popular</div>
          <div className="flex-center">New</div>
        </div>
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
      <div className="club-gallery-list">
        <div className="item">
          <img src={require(`images/club/gallery1.png`)} alt="" />
        </div>
        <div className="item">
          <img src={require(`images/club/gallery2.png`)} alt="" />
        </div>
        <div className="item">
          <img src={require(`images/club/gallery3.png`)} alt="" />
        </div>
        <div className="item">
          <img src={require(`images/club/gallery4.png`)} alt="" />
        </div>
        <div className="item">
          <img src={require(`images/club/gallery1.png`)} alt="" />
        </div>
        <div className="item">
          <img src={require(`images/club/gallery2.png`)} alt="" />
        </div>
      </div>
    </div>
  );
}

export default ClubHomeGalleries;
