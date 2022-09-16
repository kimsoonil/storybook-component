/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Header } from 'components/idist/Header';
import { useNavigate, Outlet, useSearchParams } from 'react-router-dom';

import 'assets/scss/search.scss';

function Search() {
  const searchTab = window.location.pathname.split('/');
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const searchTabArr = ['All', 'clubs', 'posts'];
  const [searchParams, setSearchParams] = useSearchParams();
  const repText = '/[ {}[]/?.,;:|)*~`!^-_+┼<>@#$%&\'"\\(=]/gi';
  const searchFuc = () => {
    let params = { search: searchText };
    setSearchParams(params);
  };

  useEffect(() => {
    if (searchParams.get('search') !== null) {
      setSearchText(searchParams.get('search'));
    }
  }, [searchParams]);

  useEffect(() => {
    console.log(searchText);
  }, [searchText]);
  return (
    <div id="root">
      <Header />
      <div className="search ">
        <div className="search-tabs">
          {searchTabArr.map((item, index) => {
            return (
              <div
                className={'search-tabs-item ' + (searchTab[2] === item && 'active')}
                key={index}
                onClick={() => navigate(item)}
              >
                {item}
              </div>
            );
          })}
        </div>
        <div className="search-input relative">
          <input
            type="test"
            placeholder="Please enter a search term"
            maxLength={300}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ''))}
          />
          <div className="search-input-btn flex-center" onClick={() => searchFuc()}>
            <img src={require('images/components/ic_search_wh.svg').default} alt="" />
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Search;
