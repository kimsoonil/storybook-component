/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Header } from 'components/idist/Header';
import { useNavigate, Outlet, useSearchParams } from 'react-router-dom';

import 'assets/scss/search.scss';
import { Button } from 'components/idist/Button';
import { Fliter } from 'components/idist/Fliter';

function Search() {
  const pathname = window.location.pathname.split('/');
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const searchTabArr = ['All', 'clubs', 'posts'];
  const [searchParams, setSearchParams] = useSearchParams();
  const [openFilter, setOpenFilter] = useState(false);
  const searchFuc = () => {
    let params = { search: searchText };
    setSearchParams(params);
  };

  useEffect(() => {
    if (searchParams.get('search') !== null) {
      setSearchText(searchParams.get('search'));
    }
  }, [searchParams]);

  return (
    <div id="root">
      <Header />
      <div className="main">
        <div className="search">
          <div className="flex-between">
            <div className="search-title">SUPER CLUB</div>
            <div className="search-tabs">
              {searchTabArr.map((item, index) => {
                return (
                  <div
                    className={'search-tabs-item ' + (pathname[3] === item.toLocaleLowerCase() && 'active')}
                    key={index}
                    onClick={() => navigate(`${item.toLocaleLowerCase()}`)}
                  >
                    {item}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="search-input relative">
            <div className="search-flex">
              <input
                className="search-input-box"
                type="text"
                placeholder="Please enter a search term"
                maxLength={300}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z0-9]/g, ''))}
              />
              <Button
                label={
                  <div className="flex-center">
                    <img src={require('images/search/ic-search.png')} /> Search
                  </div>
                }
                size={'xl'}
                width={120}
                onClick={() => searchFuc()}
              />
              <Button
                label={<img src={require('images/club/icon-filter.png')} />}
                size={'xl'}
                width={60}
                onClick={() => setOpenFilter(!openFilter)}
              />
              <div className="fliter-position" style={{ display: openFilter ? 'flex' : 'none' }}>
                <Fliter doneFuc={() => setOpenFilter(!openFilter)} />
              </div>
            </div>
            {/* <div className="search-input-btn flex-center" onClick={() => searchFuc()}>
              <img src={require('images/components/ic_search.png')} alt="" />
            </div> */}
            {/* <div className="flex-between ">
              <div className="flex-center search-keyword">
                <div className="search-keyword-item">club</div>
                <div className="search-keyword-fixItem">And</div>
                <div className="search-keyword-fixItem">Or</div>
                <div className="search-keyword-fixItem">Except</div>
              </div>
            </div> */}
          </div>
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
