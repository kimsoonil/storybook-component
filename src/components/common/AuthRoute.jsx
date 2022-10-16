import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useCheckLogIn from 'hook/useCheckLogIn';
// import { getStorage } from 'util/storage';

// auth 관련 route component는 여기에 등록

// const isAutoLogin = getStorage('autoLogin') === 'true';

function AuthRoute() {
  return <div>AuthRoute</div>;
}

function LogInRoute({ redirectPath = '/login' }) {
  const isLogin = useCheckLogIn();
  if (isLogin) return <Outlet />;

  return <Navigate to={redirectPath} replace />;
}

function NotLogInRoute({ redirectPath = '/home' }) {
  const isLogin = useCheckLogIn();
  console.log('isLogin::', isLogin);
  if (!isLogin) return <Outlet />;

  return <Navigate to={redirectPath} replace />;
}

export { AuthRoute, LogInRoute, NotLogInRoute };
