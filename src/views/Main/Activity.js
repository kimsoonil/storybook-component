/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useNavigate } from 'react-router-dom';

import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import Profile from 'components/idist/Profile.js';

function Activity() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserInit());
  }, [dispatch]);
  const { user, error } = userState;

  return (
    <div className="main ">
      <div className="container">
        <div className="item">
          <div className="activity home-box" >
            <div className="flex-between">
          <div className="activity-title">There are  <span className="bold">3 unread</span> activities.</div>
          <div className="activity-admin flex-center"><img src={require(`images/main/admin.png`)} alt="" /> Activity settings</div>
          </div>
          <div className="categories">
            <div className='item flex-center active'>All</div>
            <div className='item flex-center'>Operate Notice</div>
            <div className='item flex-center'>Club Notice</div>
            <div className='item flex-center'>User Activity</div>
          </div>
          </div>
          <div className="activity-content">
            <div className="activity-del">
              <div className="delete-btn">Delete all</div>
            </div>
            <div className="activity-list">
              <div className="activity-list-item">
                <img src={require("images/main/icon-activity1.png")}/>
                <div className="activity-list-item-content">
                  <div className="activity-list-item-title">[Super Club] restricted Kate with a 3-day activity limit.</div>
                  <div className="activity-list-item-info"><div>Super Club</div><div>10h ago</div></div>
                </div>
              </div>
            </div>
            <div className="activity-list">
              <div className="activity-list-item">
                <img src={require("images/main/icon-activity2.png")}/>
                <div className="activity-list-item-content">
                  <div className="activity-list-item-title">sana love member, tom, and others like your post</div>
                  <div className="activity-list-item-info"><div>Super Club</div><div>3h ago</div></div>
                </div>
              </div>
            </div>
            <div className="activity-list">
              <div className="activity-list-item">
                <img src={require("images/main/icon-activity3.png")}/>
                <div className="activity-list-item-content">
                  <div className="activity-list-item-title">[Twice Club] You have join</div>
                  <div className="activity-list-item-info"><div>Super Club</div><div>2h ago</div></div>
                </div>
              </div>
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
