/* eslint-disable */

import React, { useState } from 'react';
import { Header } from 'components/Header';

import 'assets/scss/search.scss';
import SearchClub from './SearchClub';
import SearchPosts from './SearchPosts';

function Search() {
  const [searchTab, setSearchTab] = useState('All');

  return (
    <div id="root">
      <Header />
      <div className="search ">
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
        <div className="search-input relative">
          <input type="test" placeholder="Please enter a search term" />
          <div className="search-input-btn flex-center">
            <img src={require('../../images/components/ic_search_wh.svg').default} alt="" />
          </div>
        </div>
        {searchTab === 'All' && (
          <>
            <SearchClub limit={12} searchTab={searchTab} setSearchTab={setSearchTab} />
            <SearchPosts />
          </>
        )}
        {searchTab === 'Clubs' && <SearchClub limit={12} searchTab={searchTab} />}
        {searchTab === 'Posts' && <SearchPosts />}
      </div>
    </div>
  );
}

export default Search;
