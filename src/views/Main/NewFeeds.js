/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useNavigate } from 'react-router-dom';
import { getPostsFeedInit } from 'redux/idistStore/postsSlice';
import { dateCalculation } from 'utils/dateCalculation';
import { Loader } from 'components/idist/Loader';
import MainTap from './MainTap';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import Profile from 'components/idist/Profile.js';

function NewFeeds() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.user);
  const { feed } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getUserInit());
    dispatch(getPostsFeedInit());
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
            {feed.message !== 'ok' ? (
              <div className="flex-center">
                <Loader />
              </div>
            ) : feed?.data?.length !== 0 ? (
              feed?.data?.map((feedItem, index) => {
                return (
                  <div
                    className="newfeeds-list flex-between"
                    key={index}
                    onClick={() => navigate(`/club/${feedItem.club}/post/${feedItem.id}`)}
                  >
                    <div>
                      <div className="newfeeds-list-title">{feedItem.title}</div>
                      <div className="newfeeds-list-content">{feedItem.content_summary}</div>
                      <div className="posts-list-item-profile">
                        <div className="posts-list-item-profile-img">
                          <img
                            className="comment-list-img"
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src = require('images/main/temporary-profile.png');
                            }}
                            src={
                              feedItem?.user?.profile_image_url
                                ? feedItem?.user?.profile_image_url
                                : require(`images/profile/profile-img${randomIndex}.png`)
                            }
                          />
                        </div>
                        <div>
                          <div className="posts-list-item-nick">{feedItem.user.username}</div>
                          <div className="posts-list-item-info">
                            <div className="flex-center">
                              <img src={require('images/main/icon-view.png')} /> {feedItem.profile.visit_count}
                            </div>
                            <div className="flex-center">
                              <img src={require('images/main/icon-comment.png')} /> {feedItem.profile.comment_count}
                            </div>
                            <div className="flex-center">{dateCalculation(feedItem.created)}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>{/* <img src={require('images/main/feed.png')} /> */}</div>
                  </div>
                );
              })
            ) : (
              <div className="no-data flex-center">
                <div>
                  <img src={require('images/Error/img_error_page.png')} alt="" />
                </div>
                <div className="no-data-title">No search results found</div>
                <div className="no-data-content">Try searching with a different keyword.</div>
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
            <img src={require(`../../images/main/chatting.png`)} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewFeeds;
