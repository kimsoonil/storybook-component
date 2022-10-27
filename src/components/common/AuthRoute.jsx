import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkLogin } from 'util/common';
// import { getStorage } from 'util/storage';

// auth 관련 route component는 여기에 등록

// const isAutoLogin = getStorage('autoLogin') === 'true';

function AuthRoute() {
  return <div>AuthRoute</div>;
}

function LogInRoute({ redirectPath = '/login' }) {
  const isLogin = checkLogin();
  if (isLogin) return <Outlet />;

  return <Navigate to={redirectPath} replace />;
}

function NotLogInRoute({ redirectPath = '/home' }) {
  const isLogin = checkLogin();
  if (!isLogin) return <Outlet />;

  return <Navigate to={redirectPath} replace />;
}

export { AuthRoute, LogInRoute, NotLogInRoute };
