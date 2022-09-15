/* eslint-disable */

import React, { useState } from 'react';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import { Button } from 'components/Button';

function TokenLogin(props) {
  const [token, setToken] = useState();

  const tokenStorage = () => {
    localStorage.setItem('token', token);
    props.setOpen(!props.open);
    window.location.reload();
  };
  return (
    <div className="popup-shadow flex-center" style={{ display: props.open ? 'flex' : 'none' }}>
      <div className="token-login relative">
        <div className="closebtn" onClick={() => props.setOpen(!props.open)}>
          <img src={require(`images/club/btn-close.png`)} alt="" />
        </div>
        <div className="token-login-title flex-center ">로그인 토큰을 입력해주세요</div>
        <div className="token-login-input flex-center">
          <input type={'text'} value={token} onChange={(e) => setToken(e.target.value)} />
        </div>
        <div className="flex-center m-3">
          <Button size="l" label={'login'} onClick={() => tokenStorage()} />
        </div>
      </div>
    </div>
  );
}

export default TokenLogin;
