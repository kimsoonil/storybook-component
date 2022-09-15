/* eslint-disable */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button.js';

import 'assets/scss/components.scss';
import TokenLogin from './TokenLogin';

function Profile(props) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {props.type === 'logout' ? (
        <div className="side-box profile ">
          <div className="profile-img flex-center">
            <div className="profile-imgBox" />
            <div className="profile-name">Enter the club!</div>
          </div>
          <div className="m-1">
            <Button primary="primary" label="Login" size="m" width={265} onClick={() => setOpen(!open)} />
          </div>
        </div>
      ) : props.type === 'login' ? (
        <div className="side-box profile relative">
          <div className="admin flex-center" onClick={() => navigate('/manage')}>
            <img src={require(`images/home/admin.png`)} alt="" /> Admin
          </div>
          <div className="profile-img flex-center">
            <img src={props.userData.profileImage} alt="" />
            <div className="profile-name">{props.userData.user}</div>
          </div>

          <div className="flex-center">
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.joinCount}</div>
              <div className="profile-info-content">Join</div>
            </div>
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.postCount}</div>
              <div className="profile-info-content">Posts</div>
            </div>
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.commentCount}</div>
              <div className="profile-info-content">Comments</div>
            </div>
          </div>
          <div className="m-1">
            <Button primary="primary" label="Create Club" size="m" width={265} />
          </div>
        </div>
      ) : props.userData.club ? (
        <div className="side-box profile relative">
          <div className="admin flex-center" onClick={() => navigate('/manage')}>
            <img src={require(`images/home/admin.png`)} alt="" /> Admin
          </div>
          <div className="profile-img flex-center">
            <img src={props.userData.user.profileImage} alt="" />
            <div className="profile-name">{props.userData.user.username}</div>
            <div className="flex-center">
              <div className="profile-staff flex-center">{props.userData.staff}</div>
              <div className="profile-level">LV {props.userData.level}</div>
            </div>
          </div>
          <div className="flex-center">
            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.visitCount}</div>
              <div className="profile-info-content">Visit</div>
            </div>

            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.postCount}</div>
              <div className="profile-info-content">Posts</div>
            </div>

            <div className="profile-info flex-center">
              <div className="profile-info-title">{props.userData.commentCount}</div>
              <div className="profile-info-content">Comments</div>
            </div>
          </div>

          <div className="m-1">
            <Button primary="primary" label="Writing" size="m" width={265} />
          </div>
        </div>
      ) : (
        <div className="side-box profile relative">
          <div className="profile-img flex-center">
            <img src={props.userData.profileImage} alt="" />
            <div className="profile-name">{props.userData.user}</div>
          </div>
          <div className="m-1">
            <Button primary="primary" label="Join" size="m" width={265} />
          </div>
        </div>
      )}
      <TokenLogin open={open} setOpen={setOpen} />
    </>
  );
}

export default Profile;
