/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdClubInit, getClubMembersInit } from 'redux/store/clubSlice';
import { useParams } from 'react-router';
import { useNavigate, Outlet } from 'react-router-dom';

import { Header } from 'components/Header';
import { Loader } from 'components/Loader';
import { CustomTab } from 'components/CustomTab';
import Home from './Home';
import Basic from './Basic';
import Board from './Board';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';

function Club() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clubState = useSelector((state) => state.club);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getIdClubInit(id));
    dispatch(getClubMembersInit(id));
  }, [dispatch]);

  const seachFunc = () => {
    navigate('/search');
  };
  const { isLoading, clubId, members } = clubState;

  if (isLoading || clubId.message !== 'ok')
    return (
      <div className="root-center">
        <Loader />
      </div>
    );
  return (
    <div id="root">
      <Header seachFunc={seachFunc} />
      <div className="club">
        <div className="club-banner relative" style={{ backgroundImage: `url(${clubId.data.bannerImageUrl})` }}>
          <div className="club-tag"></div>
          <div className="club-profile">
            <img src={clubId.data.profileImageUrl} alt="" />
          </div>
        </div>
        <div className="club-content">
          <div className="club">
            <div className="club-content-title">
              {clubId.data.name}
              <div className="manager">
                <div className="manager-tag flex-center">manager</div>
                {clubId.data.user.username}
              </div>
            </div>
            <div className="club-content-explan">{clubId.data.description}</div>
            <div className="flex-between">
              <div className="club-content-info">
                <div className="club-content-info-box">
                  <div className="club-content-info-number">{clubId.data.memberCount}</div>
                  <div className="club-content-info-title">Memeber</div>
                </div>
                <div className="club-content-info-box">
                  <div className="club-content-info-number">{clubId.data.postCount}</div>
                  <div className="club-content-info-title">Post</div>
                </div>
                <div className="club-content-info-box">
                  <div className="club-content-info-number">{clubId.data.pinCount}</div>
                  <div className="club-content-info-title">Pin Clip</div>
                </div>
              </div>
              <div className="club-icon-btn">
                <div className="item flex-center">
                  <img src={require(`images/club/rank.png`)} alt="" />
                </div>
                <div className="item flex-center">
                  <img src={require(`images/club/club-bookmark.png`)} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="club-hr" />
        <CustomTab
          elements={[
            {
              tabTitle: 'Home',
              tabBody: <Outlet />,
              path: 'Home'
            },
            {
              tabTitle: 'Basic',
              tabBody: <Outlet />,
              path: 'Basic'
            },
            {
              tabTitle: 'Board',
              tabBody: <Board />,
              path: 'Board'
            },
            {
              tabTitle: 'Photo',
              tabBody: <Outlet />,
              path: 'Photo'
            },
            {
              tabTitle: 'Certified',
              tabBody: <Outlet />,
              path: 'Certified'
            },
            {
              tabTitle: 'Twice',
              tabBody: <Outlet />,
              path: 'Twice'
            },
            {
              tabTitle: 'Link',
              tabBody: <Outlet />,
              path: 'Link'
            }
          ]}
        />
      </div>
    </div>
  );
}

export default Club;
