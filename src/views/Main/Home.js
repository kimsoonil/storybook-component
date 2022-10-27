/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { getClubsInit, postClubPinInit, postClubUnpinInit } from 'redux/idistStore/clubSlice';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';
import NewClubs from 'components/idist/Main/NewClubs';
import PopularPosts from 'components/idist/Main/PopularPosts';
import HotVideos from 'components/idist/Main/HotVideos';
import HotClubs from 'components/idist/Main/HotClubs';
import SideActivity from 'components/idist/Main/SideActivity';
import MyClubs from 'components/idist/Main/SideMyClubs';
import MyFeeds from 'components/idist/Main/SideNewFeeds';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import Profile from 'components/idist/Profile.js';
import { Loader } from 'components/idist/Loader';
import MainTap from './MainTap';

function Home() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const clubState = useSelector((state) => state.club);
  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(categoriesInit());
    dispatch(getUserInit());
    dispatch(getClubsInit({ parameters: '' }));
  }, [dispatch]);

  const { user, error } = userState;
  const { clubs } = clubState;
  const { isLoading, list } = categories;

  console.log('clubs', clubs);

  const handleClickPin = (e, pin, id) => {
    e.stopPropagation();
    if (pin) {
      dispatch(postClubUnpinInit({ id: id, actionList: [{ type: getClubsInit.type, payload: { parameters: '' } }] }));
    } else {
      dispatch(postClubPinInit({ id: id, actionList: [{ type: getClubsInit.type, payload: { parameters: '' } }] }));
    }
  };
  return (
    <div className="container">
      <div className="item">
        <MainTap />
        <div style={{ marginBottom: '23px' }}>
          {clubs.message === 'ok' ? (
            <HotClubs clubsData={clubs.data} categoriesData={list} handleClickPin={handleClickPin} />
          ) : (
            <div className="flex-center">
              <Loader />
            </div>
          )}
        </div>
        <div style={{ marginBottom: '43px' }}>
          {clubs.message === 'ok' ? (
            <NewClubs clubsData={clubs.data} categoriesData={list} handleClickPin={handleClickPin} />
          ) : (
            <div className="flex-center">
              <Loader />
            </div>
          )}
        </div>
        <div style={{ marginBottom: '32px' }}>
          <HotVideos />
        </div>
        <div style={{ marginBottom: '43px' }}>
          <PopularPosts />
        </div>
      </div>
      <div className="item">
        {user.data ? (
          user.data.id !== null ? (
            <Profile userData={user.data} type={'login'} />
          ) : (
            <Profile type={'logout'} />
          )
        ) : (
          <Profile type={'logout'} />
        )}
        <div className="chatting">
          <img src={require(`images/main/chatting.png`)} alt="" />
        </div>
        {user.data && user.data.id !== null && (
          <>
            <div>
              <MyClubs />
            </div>
            <div>
              <MyFeeds />
            </div>
            <div>
              <SideActivity />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
