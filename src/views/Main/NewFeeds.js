/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useNavigate } from 'react-router-dom';
import MainTap from './MainTap';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import Profile from 'components/idist/Profile.js';

function NewFeeds() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInit());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 914);
  }, []);
  return (
    <div className="main ">
      <div className="container">
        <div className="item">
          <MainTap />
          <div className="newfeeds-header">
            <div className="clubs-title">New Feeds</div>
          </div>
          <div className="home-box newfeeds-body">
            {[...Array(6)].map((item, index) => {
              return (
                <div className="newfeeds-list flex-between" key={index}>
                  <div>
                    <div className="newfeeds-list-title">게시글 제목입니다.</div>
                    <div className="newfeeds-list-content">
                      Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod tempor incididunt ut labore.
                    </div>
                    <div className="posts-list-item-profile">
                      <div className="posts-list-item-profile-img">
                        <img src={require('images/main/temporary-profile.png')} />
                      </div>
                      <div>
                        <div className="posts-list-item-nick">작성자</div>
                        <div className="posts-list-item-info">
                          <div className="flex-center">
                            <img src={require('images/main/icon-view.png')} /> 0
                          </div>
                          <div className="flex-center">
                            <img src={require('images/main/icon-comment.png')} /> 0
                          </div>
                          <div className="flex-center">53m age</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <img src={require('images/main/feed.png')} />
                  </div>
                </div>
              );
            })}
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
            <img src={require(`../../images/main/chatting.png`)} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFeeds;
