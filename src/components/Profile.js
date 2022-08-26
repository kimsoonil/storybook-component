/* eslint-disable */

import React from 'react';

import { Button } from '../components/Button.jsx';
import '../assets/scss/components.scss';

function Profile() {
  return (
    <div className="side-box profile">
      <div className="profile-img flex-center">
        <img src={require('../images/home/profile.png')} alt="" />
        <div className="profile-name">Kate</div>
      </div>
      <div className="flex-center">
        <div className="profile-info flex-center">
          <div className="profile-info-title">458</div>
          <div className="profile-info-content">Join</div>
        </div>
        <div className="profile-info flex-center">
          <div className="profile-info-title">12K</div>
          <div className="profile-info-content">Posts</div>
        </div>
        <div className="profile-info flex-center">
          <div className="profile-info-title">1.4K</div>
          <div className="profile-info-content">Comments</div>
        </div>
      </div>
      <div className="m-1">
        <Button primary={'primary'} label={'Create Club'} size={'m'} width={265} />
      </div>
      <div className="m-1">
        <Button primary={'primary'} label={'Club Management'} size={'m'} style={{ opacity: 0.5, width: '265px' }} />
      </div>
    </div>
  );
}

export default Profile;
