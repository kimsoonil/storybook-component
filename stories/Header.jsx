import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button } from './Button';
import './header.css';

export const Header = ({ user, country }) => {
  return (
    <header>
      <div className="wrapper">
        <div className="wrapper-content">
          <div>
            <img src={require('./assets/logo_top.svg').default} alt="logo_top" />
          </div>
          <div className="flex-center">
            <div className="menu activate">
              <img src={require('./assets/menu_home.svg').default} alt="menu_home" />
              <div className="tootip flex-center relative">Home</div>
            </div>
            <div className="menu ">
              <img src={require('./assets/menu_club.svg').default} alt="menu_club" />
              <div className="tootip flex-center relative">Club</div>
            </div>
            <div className="menu ">
              <img src={require('./assets/menu_forum.svg').default} alt="menu_forum" />
              <div className="tootip flex-center relative">Forum</div>
            </div>
            <div className="menu ">
              <img src={require('./assets/menu_game.svg').default} alt="" />
              <div className="tootip flex-center relative">Game</div>
            </div>
            <div className="menu ">
              <img src={require('./assets/menu_dating.svg').default} alt="" />
              <div className="tootip flex-center relative">Dating</div>
            </div>
            <div className="menu ">
              <img src={require('./assets/menu_nft.svg').default} alt="" />
              <div className="tootip flex-center relative">Nft</div>
            </div>
          </div>
          <div className="flex-center relative">
            <input className="seachBar" placeholder="검색어를 입력하세요." />
            <div className="seachIc">
              <img src={require('./assets/ic_search_wh.svg').default} alt="" />
            </div>
          </div>
          <div>
            {user ? (
              <div className="flex-center">
                <div className="menu ">
                  <img src={require('./assets/menu_bookmark.svg').default} alt="" />
                  {/* <div className="tootip flex-center relative">Bookmark</div> */}
                </div>
                <div className="menu ">
                  <img src={require('./assets/menu_chat_new.svg').default} alt="" />
                  {/* <div className="tootip flex-center relative">Chat</div> */}
                </div>
                <div className="menu ">
                  <img src={require('./assets/menu_notification.svg').default} alt="" />
                  {/* <div className="tootip flex-center relative">Notification</div> */}
                </div>
              </div>
            ) : (
              <div className="flex-center">
                <div className="loginBtn flex-center" onClick={() => (user = {})}>
                  Login
                </div>
                <div>
                  <img src={require(`./assets/ic_flag_${country}.svg`)} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.shape({}),
  country: PropTypes.oneOf(['ko', 'us', 'jp'])
};

Header.defaultProps = {
  user: null,
  country: 'ko'
};
