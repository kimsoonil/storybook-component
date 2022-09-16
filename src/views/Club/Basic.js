/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubMembersInit } from 'redux/idistStore/clubSlice';
import { useParams } from 'react-router';
import { useOutletContext } from 'react-router-dom';
import { postsList } from '../Home/homeDate';
import { Loader } from 'components/idist/Loader';
import Profile from 'components/idist/Profile';
import BorardAlbum from 'components/idist/BorardAlbum';
import BorardList from 'components/idist/BorardList';
import BorardCard from 'components/idist/BorardCard';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import { Fliter } from 'components/idist/Fliter';
import ToggleBtn from 'components/idist/ToggleBtn';

function Basic(props) {
  const [boardState, setBoardState] = useState('album');
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const clubState = useSelector((state) => state.club);
  const { id } = useParams();
  const clubId = useOutletContext();

  return (
    <div className="club-home container">
      <div className="item">
        <div>
          <div className="club-home-title">Basic</div>
          <div className="flex-between">
            <div className="club-list-tag">
              <div className="item active flex-center">Popular</div>
              <div className="item flex-center">NEW</div>
            </div>
            <div className="flex-center">
              <div className="feed">
                My feed
                <ToggleBtn id={'myFeed'} />
              </div>
              <div className="fliter-icon relative">
                <div onClick={() => setOpenFilter(!openFilter)}>
                  <img src={require(`images/club/icon-fliter.png`)} alt="" />
                </div>
                <div className="fliter-position" style={{ display: openFilter ? 'flex' : 'none' }}>
                  <Fliter doneFuc={() => setOpenFilter(!openFilter)} />
                </div>
              </div>
              <div className="board-state">
                <div
                  className={'album ' + (boardState === 'album' && 'active')}
                  onClick={() => {
                    setBoardState('album');
                  }}
                ></div>
                <div
                  className={'list ' + (boardState === 'list' && 'active')}
                  onClick={() => {
                    setBoardState('list');
                  }}
                ></div>
                <div
                  className={'card ' + (boardState === 'card' && 'active')}
                  onClick={() => {
                    setBoardState('card');
                  }}
                ></div>
              </div>
            </div>
          </div>
          {boardState === 'album' && <BorardAlbum DataList={postsList} />}
          {boardState === 'list' && <BorardList DataList={postsList} />}
          {boardState === 'card' && <BorardCard DataList={postsList} />}
        </div>
      </div>
      <div className="item">
        <Profile userData={clubId.data.profile} type="club" />

        <div className="member">
          <div className="flex-between">
            <div className="member-title">Member</div>
            <div className="member-see">See All</div>
          </div>
          {/* {members.message !== 'ok' ? (
            <div className="root-center">
              <Loader />
            </div>
          ) : (
            <div className="member-list">
              {members.data.map((members, index) => {
                return (
                  <div key={index} className="member-list-item flex-center">
                    <div className="member-list-img">
                      <img src={members.user.profileImageUrl} alt="" />
                    </div>
                    <div className="member-list-name">{members.user.user}</div>
                  </div>
                );
              })}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}

export default Basic;
