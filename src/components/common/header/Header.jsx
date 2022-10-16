import React from 'react';
// import classnames from 'classnames';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { setStorage } from 'util/storage';
// import { showPopup } from 'redux/store/common/popupSlice';
import useCheckLogIn from 'hook/useCheckLogIn';
import { reqLogOut } from 'redux/store/common/logInSlice';
import MenuIcon from './MenuIcon';

function Header() {
  const arrLeftMenu = [
    { name: 'HOME', path: '/home' },
    { name: 'CLUB', path: '/clubs' },
    { name: 'FORUM', path: '/forum' },
    { name: 'NFT', path: '/nft' },
    { name: 'GAME', path: '/game' },
    { name: 'DATING', path: '/dating' }
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useCheckLogIn();

  return (
    <div id="header_wrap">
      <div className="gnb_wrap">
        <div className="menu_wrap">
          <h1 className="logo">
            <button>
              <span className="a11y">SuperClub</span>
            </button>
          </h1>
          <ul className="gnb_menu">
            {arrLeftMenu.map((item) => (
              <MenuIcon key={item.name} name={item.name} path={item.path} leftMenuArr={arrLeftMenu} />
            ))}
          </ul>
        </div>
        <div className="gnb_search">
          <input type="text" className="top_search" placeholder="Search..." />
          <button type="button" className="btn_top_search">
            <span className="a11y">검색</span>
          </button>
        </div>
        <ul className="persnol_menu">
          {/* // S : 개인메뉴 // */}
          <li>
            <button type="button" className="gnb book open_tip">
              <span className="a11y">book</span>
            </button>
            <div className="tooltip bottom">
              <span>BOOKMARK</span>
            </div>
          </li>
          <li>
            <button type="button" className="gnb chat open_tip">
              <span className="a11y">Chat</span>
            </button>
            <div className="tooltip bottom">
              <span>CHAT</span>
            </div>
          </li>
          <li>
            <button type="button" className="gnb noti new open_tip">
              <span className="a11y">Noti</span>
            </button>
            <div className="tooltip bottom">
              <span>NOTIFICATION</span>
            </div>
          </li>
          {/* // E : 개인메뉴 // */}
          <li>
            {isLogin ? (
              <>
                <button
                  type="button"
                  className="btn_round btn_white"
                  onClick={() => dispatch(reqLogOut({ id: 1, navigate }))}
                >
                  <span>Logout</span>
                </button>
                {/* <button type="button" className="btn_round btn_white" onClick={() => setStorage('autoLogin', 'false')}>
                  <span>AutoLogin</span>
                </button> */}
              </>
            ) : (
              <button type="button" className="btn_round btn_white" onClick={() => navigate('/login')}>
                <span>Login</span>
              </button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
