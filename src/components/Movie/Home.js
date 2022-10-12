import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useMenu from 'hook/useMenu';
import useCheckLogIn from 'hook/useCheckLogIn';
import { getStorage, setStorage } from 'util/storage';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { reqLogOut } from 'redux/store/logInSlice';
import Search from './Search';
import MoviesList from './MoviesList';

function Home() {
  const { i18n } = useTranslation();
  const buttons = ['ko', 'en'];
  const [active, setActive] = useState('');
  const [hovered, setHovered] = useState('');
  const isLogin = useCheckLogIn();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // axios lang header로 추가
    setStorage('lang', lng);
  };

  useEffect(() => {
    if (!getStorage('lang')) setStorage('lang', i18n.language);
  }, []);
  return (
    <div>
      <div>{useMenu({ buttons, active, setActive, hovered, setHovered, onClickCallback: changeLanguage })}</div>
      <div>{i18n.language}</div>
      {isLogin ? (
        <div>
          <button type="button" onClick={() => dispatch(reqLogOut({ id: 1, navigate }))}>
            logout
          </button>
        </div>
      ) : (
        <div>
          <button type="button" onClick={() => navigate('/login')}>
            login
          </button>
        </div>
      )}
      <Search />
      <MoviesList />
    </div>
  );
}

export default Home;
