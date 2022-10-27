/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import { NICKNAME_STATUS_INIT, NICKNAME_STATUS_SAVED } from 'constants/type';
import NickName from './NickName';
import Account from './Account';
import Sns from './Sns';

function AccountManagement() {
  const { user } = useSelector((state) => ({ ...state.logIn }));
  const [nickStatus, setNickStatus] = useState(user.nickname_is_new ? NICKNAME_STATUS_INIT : NICKNAME_STATUS_SAVED);
  const [visibleInfo, setVisibleInfo] = useState(false);

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container" className="subpage">
          <div className="sidemenu" />
          <div className="content">
            <h3 className="h3Type eng center">ACCOUNT SETTING</h3>
            {/* Nickname */}
            <NickName user={user} visibleInfo={visibleInfo} nickStatus={nickStatus} setNickStatus={setNickStatus} />
            {/* Account Infomation Modify */}
            <Account user={user} visibleInfo={visibleInfo} setVisibleInfo={setVisibleInfo} nickStatus={nickStatus} />
            {/* SNS Interworking */}
            <Sns visibleInfo={visibleInfo} />
          </div>
          <button type="button" className="btn_topmove">
            <span className="a11y">최상위로 이동</span>
          </button>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default AccountManagement;
