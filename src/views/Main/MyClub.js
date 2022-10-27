/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { getClubsInit } from 'redux/idistStore/clubSlice';
import { useNavigate } from 'react-router-dom';
import MainTap from './MainTap';
import Profile from 'components/idist/Profile.js';
import { Loader } from 'components/idist/Loader';

function MyClub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { myclubs } = useSelector((state) => state.club);
  let parameters = { is_joined: true };

  useEffect(() => {
    dispatch(getUserInit());
    dispatch(getClubsInit({ parameters: parameters, type: 'myclub' }));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 914);
  }, []);

  https: return (
    <div className="main">
      <div className="container">
        <div className="item">
          <MainTap />
          <div className="myclub">
            <div className="myclub-title">My clubs</div>
            {myclubs.message === 'ok' ? (
              myclubs.data.map((clubItem, clubIndex) => {
                if (clubIndex < 6)
                  return (
                    <div className="myclub-item" key={clubIndex} onClick={() => navigate(`/club/${clubItem.id}/home`)}>
                      <div className="myclub-item-img">
                        <img
                          src={
                            clubItem.banner_image_url
                              ? clubItem.banner_image_url
                              : require('images/club/club-dummy.png')
                          }
                        />
                        <div className="myclub-item-profile-img">
                          <img
                            src={
                              clubItem.profile_image_url
                                ? clubItem.profile_image_url
                                : require('images/club/club-dummy.png')
                            }
                          />
                        </div>
                      </div>
                      <div className="myclub-item-content">
                        <div className="myclub-item-title">{clubItem.title}</div>
                        <div className="myclub-item-count">New post 11</div>
                        <div className="flex-between">
                          <div className="myclub-item-post">attendanec check</div>
                          <div className="myclub-item-info">adim • 53m age</div>
                        </div>
                        <div className="flex-between">
                          <div className="myclub-item-post">loloi~!</div>
                          <div className="myclub-item-info">adim • 53m age</div>
                        </div>
                        <div className="flex-between">
                          <div className="myclub-item-post">When are you dating?</div>
                          <div className="myclub-item-info">adim • 53m age</div>
                        </div>
                      </div>
                    </div>
                  );
              })
            ) : (
              <div className="flex-center">
                <Loader />
              </div>
            )}
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
        </div>
      </div>
    </div>
  );
}

export default MyClub;
