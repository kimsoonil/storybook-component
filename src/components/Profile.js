import React from 'react';

import { Button } from './Button.js';

import 'assets/scss/components.scss';

function Profile(props) {
  if (props.type === 'club')
    if (props.userData) {
      return (
        <div className="side-box profile">
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
              {/* <div className="profile-info-title">{props.userData.joinCount}</div> */}
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
            <Button primary="primary" label="Writing" size="m" width={265} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="side-box profile">
          <div className="profile-img flex-center">
            <div className="profile-imgBox" />
            <div className="profile-name">Enter the club!</div>
          </div>

          <div className="m-1">
            <Button primary="primary" label="Login" size="m" width={265} />
          </div>
        </div>
      );
    }
  return (
    <div className="side-box profile">
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
      <div className="m-1">
        <Button primary="primary" label="Club Management" size="m" style={{ opacity: 0.5, width: '265px' }} />
      </div>
    </div>
  );
}

export default Profile;
