/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getclubProfilesInit } from 'redux/idistStore/clubSlice';
import Profile from 'components/idist/Profile';
import SideEvent from './SideEvent';

function Member(props) {
  const clubId = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.club);
  const [memberState, setMemberState] = useState('member');

  useEffect(() => {
    dispatch(getclubProfilesInit({ id: clubId.data.id }));
  }, [dispatch]);

  return (
    <div className="club-home container">
      <div className="item">
        <div className="club-home-content member-home">
          <div className="flex-between">
            <div className="club-home-title">Member</div>
            <div className="member-select">
              <div
                className={'member-select-btn flex-center ' + (memberState === 'member' && 'active')}
                onClick={() => setMemberState('member')}
              >
                member
              </div>
              <div
                className={'member-select-btn flex-center ' + (memberState === 'staff' && 'active')}
                onClick={() => setMemberState('staff')}
              >
                staff
              </div>
            </div>
          </div>
          <div className="member-content">
            {profile.message !== 'ok' ? (
              <div className="root-center">
                <Loader />
              </div>
            ) : (
              profile.data.map((memberItem, index) => {
                return memberState === 'member' ? (
                  <div
                    className="member-content-item"
                    key={index}
                    onClick={() => navigate(`/club/${clubId.data.id}/memberProfile/${memberItem.id}`)}
                  >
                    <img
                      src={
                        memberItem.user.profile_image_url
                          ? memberItem.user.profile_image_url
                          : require('images/main/temporary-profile.png')
                      }
                    />
                    <div>
                      <div className="member-content-item-name">{memberItem.user.username}</div>
                      <div className={'member-content-item-reting flex-center ' + memberItem.grade_name}>
                        {memberItem.grade_name}
                      </div>
                      <div className="member-content-item-level flex-center">lv {memberItem.level}</div>
                    </div>
                  </div>
                ) : (
                  memberItem.staff !== null && (
                    <div key={index} className="member-content-staff">
                      <div className={'member-content-staff-title ' + memberItem.staff_name}>
                        {memberItem.staff_name}
                      </div>
                      {profile.data.map((memberItem, index) => {
                        if (memberItem.staff_name === 'MASTER')
                          return (
                            <div
                              className="member-content-item"
                              key={index}
                              onClick={() => navigate(`/club/${clubId.data.id}/memberProfile/${memberItem.id}`)}
                            >
                              <img
                                src={
                                  memberItem.user.profile_image_url
                                    ? memberItem.user.profile_image_url
                                    : require('images/main/temporary-profile.png')
                                }
                              />
                              <div>
                                <div className="member-content-item-name">{memberItem.user.username}</div>
                                <div className={'member-content-item-reting flex-center ' + memberItem.grade_name}>
                                  {memberItem.grade_name}
                                </div>
                                <div className="member-content-item-level flex-center">lv {memberItem.level}</div>
                              </div>
                            </div>
                          );
                      })}
                    </div>
                  )
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}
        <div>
          <SideEvent />
        </div>
      </div>
    </div>
  );
}

export default Member;
