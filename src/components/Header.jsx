/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import '../assets/scss/reset.scss';
import '../assets/scss/components.scss';

export function Header({ user, country, seachFunc }) {
  return (
    <header>
      <div className="header flex-center">
        <div className="header-content flex-between">
          <div>
            <img src={require('../images/components/logo_top.svg').default} alt="logo_top" />
          </div>
          <div className="flex-center">
            <div className="menu activate">
              <img src={require('../images/components/menu_home.svg').default} alt="menu_home" />
              <div className="tootip flex-center relative">Home</div>
            </div>
            <div className="menu ">
              <img src={require('../images/components/menu_club.svg').default} alt="menu_club" />
              <div className="tootip flex-center relative">Club</div>
            </div>
            <div className="menu ">
              <img src={require('../images/components/menu_forum.svg').default} alt="menu_forum" />
              <div className="tootip flex-center relative">Forum</div>
            </div>
            <div className="menu ">
              <img src={require('../images/components/menu_game.svg').default} alt="" />
              <div className="tootip flex-center relative">Game</div>
            </div>
            <div className="menu ">
              <img src={require('../images/components/menu_dating.svg').default} alt="" />
              <div className="tootip flex-center relative">Dating</div>
            </div>
            <div className="menu ">
              <img src={require('../images/components/menu_nft.svg').default} alt="" />
              <div className="tootip flex-center relative">Nft</div>
            </div>
          </div>
          <div className="flex-center relative">
            <input className="seachBar" placeholder="검색어를 입력하세요." />
            <div className="seachIc" onClick={seachFunc()}>
              <img src={require('../images/components/ic_search_wh.svg').default} alt="" />
            </div>
          </div>
          <div>
            {user ? (
              <div className="flex-center">
                <div className="menu ">
                  <img src={require('../images/components/menu_bookmark.svg').default} alt="" />
                  {/* <div className="tootip flex-center relative">Bookmark</div> */}
                </div>
                <div className="menu ">
                  <img src={require('../images/components/menu_chat_new.svg').default} alt="" />
                  {/* <div className="tootip flex-center relative">Chat</div> */}
                </div>
                <div className="menu ">
                  <img src={require('../images/components/menu_notification.svg').default} alt="" />
                  {/* <div className="tootip flex-center relative">Notification</div> */}
                </div>
                <div className="user-icon flex-center">
                  <img src={require('../images/components/user.png')} alt="" />
                </div>
              </div>
            ) : (
              <div className="flex-center">
                <div className="loginBtn flex-center" onClick={() => (user = {})}>
                  Login
                </div>
                <div>
                  <img src={require(`../images/components/ic_flag_${country}.svg`)} alt="" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  user: PropTypes.shape({}),
  country: PropTypes.oneOf(['ko', 'us', 'jp']),
  seachFunc: PropTypes.func
};

Header.defaultProps = {
  user: null,
  country: 'ko',
  seachFunc: () => {}
};
