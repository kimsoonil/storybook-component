/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { wholeClubList } from '../Home/homeDate';
import '../../assets/scss/search.scss';
import '../../assets/scss/reset.scss';

function Search() {
  const [searchTab, setSearchTab] = useState('All');
  return (
    <div id="root">
      <Header />
      <div className="search">
        <div className="search-tabs">
          <div
            className={'search-tabs-item ' + (searchTab === 'All' && 'active')}
            onClick={() => {
              setSearchTab('All');
            }}
          >
            All
          </div>
          <div
            className={'search-tabs-item ' + (searchTab === 'Clubs' && 'active')}
            onClick={() => {
              setSearchTab('Clubs');
            }}
          >
            Clubs
          </div>
          <div
            className={'search-tabs-item ' + (searchTab === 'Posts' && 'active')}
            onClick={() => {
              setSearchTab('Posts');
            }}
          >
            Posts
          </div>
        </div>
        <div className="search-input">
          <input type="test" placeholder="Please enter a search term" />
          <div className="search-input-btn"></div>
        </div>
        <div className="search-club">
          <div className="search-club-title"> 2,108 Clubs</div>
          <div className="whole-club-tab">
            <div className="item active flex-center">All</div>
            <div className="item flex-center">Game</div>
            <div className="item flex-center">NFT</div>
            <div className="item flex-center">Sports</div>
            <div className="item flex-center">Stoak</div>
            <div className="item flex-center">Fandom</div>
            <div className="item flex-center">Cumunity</div>
          </div>
          <div className="whole-club-list">
            {wholeClubList.map((wholeItem, index) => {
              return (
                <div className="whole-club-item" key={index}>
                  <div className="whole-club-item-img">
                    <img src={require(`../../images/home/${wholeItem.img}`)} alt="" />
                  </div>
                  <div className="whole-club-item-content">
                    <div className={'whole-club-item-category ' + wholeItem.category}>{wholeItem.category}</div>
                    <div className="whole-club-item-name">{wholeItem.name}</div>
                    <div className="whole-club-item-info">
                      Members {wholeItem.members} ・ Like {wholeItem.like}{' '}
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ width: '100%' }}></div>
          </div>
        </div>
        <div className="search-post"></div>
      </div>
    </div>
  );
}

export default Search;
