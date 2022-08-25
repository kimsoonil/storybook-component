/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { wholeClubList, postsList } from '../Home/homeDate';
import '../../assets/scss/search.scss';
import { Button } from '../../components/Button';

function SearchClub() {
  return (
    <div className="search-club">
      <div className="search-club-title"> 2,108 Clubs</div>
      <div className="search-club-tab">
        <div className="item active flex-center">All</div>
        <div className="item flex-center">Game</div>
        <div className="item flex-center">NFT</div>
        <div className="item flex-center">Sports</div>
        <div className="item flex-center">Stoak</div>
        <div className="item flex-center">Fan Club</div>
        <div className="item flex-center">Social</div>
        <div className="item flex-center">Traveling</div>
        <div className="item flex-center">Animals</div>
      </div>
      <div className="search-club-list">
        {wholeClubList.map((wholeItem, index) => {
          return (
            <div className="search-club-list-item relative" key={index}>
              <div className="search-club-item-img ">
                <div className="super-icon flex-center">★</div>
                <img src={require(`../../images/home/${wholeItem.img}`)} alt="" />
              </div>
              <div className="search-club-list-item-content">
                <div className="search-club-list-item-name">{wholeItem.name}</div>
                <div className="search-club-list-item-info">
                  Members {wholeItem.members} ・ {wholeItem.like > 300 ? 'Gold' : 'sliver'}
                </div>
                <div className="bookmark flex-center">
                  <img src={require(`../../images/search/icon-bookmarks.png`)} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-center">
        <Button size="l" label={'More'} width={116} />
      </div>
    </div>
  );
}

export default SearchClub;
