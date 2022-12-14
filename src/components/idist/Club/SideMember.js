/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getclubProfilesInit } from 'redux/idistStore/clubSlice';
import { Loader } from 'components/idist/Loader';

function SideMember() {
  const dispatch = useDispatch();
  const clubId = useOutletContext();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.club);

  useEffect(() => {
    dispatch(getclubProfilesInit({ id: clubId.data.id }));
  }, [dispatch]);
  if (profile.message !== 'ok')
    return (
      <div className="root-center">
        <Loader />
      </div>
    );

  return profile.data.length !== 0 ? (
    <div className="club-home-content side-member">
      <div className="flex-between">
        <div className="side-box-title">Member</div>
        <div className="see-all" onClick={() => navigate(`/club/${clubId.data.id}/member`)}>
          See All
        </div>
      </div>

      <div className="side-member-list">
        {profile.data.map((members, index) => {
          return (
            <div
              className="side-member-list-item flex-center"
              key={index}
              onClick={() => navigate(`/club/${clubId.data.id}/memberProfile/${members.id}`)}
            >
              <div className="side-member-list-img">
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = require('images/main/temporary-profile.png');
                  }}
                  src={
                    members?.profile?.user?.profile_image_url
                      ? members?.profile?.user?.profile_image_url
                      : require('images/main/temporary-profile.png')
                  }
                />
              </div>
              <div className="side-member-list-name">{members?.user?.username}</div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default SideMember;
