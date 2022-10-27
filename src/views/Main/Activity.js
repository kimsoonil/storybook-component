/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActivitiesInit } from 'redux/idistStore/activitiesSlice';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import Profile from 'components/idist/Profile.js';
import { dateCalculation } from 'utils/dateCalculation';
import MainTap from './MainTap';

function Activity() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { activities } = useSelector((state) => state.activity);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getActivitiesInit());
    dispatch(getUserInit());
  }, [dispatch]);
  useEffect(() => {
    window.scrollTo(0, 914);
  }, []);
  if (activities.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );

  return (
    <div className="main ">
      <div className="container">
        <div className="item">
          <MainTap />
          <div className="activity home-box">
            <div className="flex-between">
              <div className="activity-title">
                There are <span className="bold">{activities.count} unread</span> activities.
              </div>
              <div className="activity-admin flex-center">
                <img src={require(`images/main/admin.png`)} alt="" /> Activity settings
              </div>
            </div>
            <div className="categories">
              <div className="item flex-center active">All</div>
              <div className="item flex-center">Operate Notice</div>
              <div className="item flex-center">Club Notice</div>
              <div className="item flex-center">User Activity</div>
            </div>
          </div>
          <div className="activity-content">
            <div className="activity-del">
              <div className="delete-btn">Delete all</div>
            </div>
            <div className="activity-list">
              {activities.data.length > 0 ? (
                activities.data.map((activityItem, index) => {
                  return (
                    <div className="activity-list-item" key={index}>
                      <img src={require('images/main/icon-activity1.png')} />
                      <div className="activity-list-item-content">
                        <div className="flex-center">
                          <div className="activity-list-item-title">[{activityItem.title}]</div>
                          <div
                            className="activity-list-item-explain"
                            dangerouslySetInnerHTML={{ __html: activityItem.content }}
                          ></div>
                        </div>
                        <div className="activity-list-item-info">
                          <div>{activityItem?.profile?.user.username}</div>
                          <div>{dateCalculation(activityItem.created)}</div>
                        </div>
                      </div>
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
          <div className="activity-explan">Only activity notifications within the last 30 days are exposed.</div>
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

export default Activity;
