import React from 'react';
import { checkLogin } from 'util/common';
import LoginMain from './LoginMain';
import LogoutMain from './LogoutMain';

function Main() {
  const isLogin = checkLogin();
  return <div>{isLogin ? <LogoutMain /> : <LoginMain />}</div>;
}

export default Main;
