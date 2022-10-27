/* eslint-disable */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getClubInit, postClubJoinInit } from 'redux/idistStore/clubSlice';

import { Button } from './Button.js';
import 'assets/scss/components.scss';
import TokenLogin from './TokenLogin';

function Profile(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleClickJoin = () => {
    dispatch(
      postClubJoinInit({
        id: id,
        actionList: [{ type: getClubInit.type, payload: { id: id } }]
      })
    );
  };

  return (
    <>
      {props.type === 'logout' ? (
        <div className="side-box profile ">
          <div className="profile-img flex-center">
            <div className="profile-imgBox" />
            <div className="profile-name ">
              Find a club
              <br /> and play together
            </div>
          </div>
          <div className="m-1">
            <Button primary="point" label="Login" size="m" width={265} onClick={() => setOpen(!open)} />
          </div>
        </div>
      ) : props.type === 'login' ? (
        <div className="side-box profile image relative">
          <div className="admin-nav " onClick={() => navigate('/manage')}>
            <img src={require(`images/main/admin.png`)} alt="" /> Admin
          </div>
          <div className="profile-img">
            <img
              src={
                props.userData.profile_image
                  ? props.userData.profile_image
                  : require('images/main/temporary-profile.png')
              }
              alt=""
            />
            <div className="profile-name">{props.userData.username}</div>
          </div>

          <div className="flex-center">
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.join_count}</div>
              <div className="profile-info-content">Join</div>
            </div>
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.post_count}</div>
              <div className="profile-info-content">Posts</div>
            </div>
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.comment_count}</div>
              <div className="profile-info-content">Comments</div>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button primary="point" label="Create Club" size="m" width={265} onClick={() => navigate('/club/new')} />
          </div>
        </div>
      ) : props.userData.club ? (
        <div className="side-box profile image relative">
          <div className="admin-nav " onClick={() => navigate('/manage')}>
            <img src={require(`images/main/admin.png`)} alt="" /> Admin
          </div>
          <div className="profile-img ">
            <img
              src={
                props.userData.user.profile_image_url
                  ? props.userData.user.profile_image_url
                  : require('images/main/temporary-profile.png')
              }
              alt=""
            />
            <div className="profile-name">
              {props.userData.user.username}
              {props?.userData?.staff_title === null ? (
                <>
                  <div className="profile-rating flex-center">{props?.userData?.grade_title}</div>
                  <div className="profile-level">LV {props?.userData?.level}</div>
                </>
              ) : (
                <div className="profile-staff flex-center">{props?.userData?.staff_title}</div>
              )}
            </div>
          </div>
          <div className="flex-center">
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.visit_count}</div>
              <div className="profile-info-content">Visit</div>
            </div>

            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.post_count}</div>
              <div className="profile-info-content">Posts</div>
            </div>

            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.comment_count}</div>
              <div className="profile-info-content">Comments</div>
            </div>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Button
              primary="point"
              label={
                <div className="flex-center">
                  <img src={require('images/main/icon-writing.png')} />
                  Writing
                </div>
              }
              size="m"
              width={265}
              onClick={() => navigate('../writing')}
            />
          </div>
        </div>
      ) : (
        <div className="side-box profile image relative">
          <div className="profile-img">
            <img
              src={
                props.userData.profile_image
                  ? props.userData.profile_image
                  : require('images/main/temporary-profile.png')
              }
              alt=""
            />
            <div className="profile-name">{props.userData.username}</div>
          </div>
          <div className="m-1">
            <Button primary="point" label="Join" size="m" width={265} onClick={() => handleClickJoin()} />
          </div>
        </div>
      )}
      <TokenLogin open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
