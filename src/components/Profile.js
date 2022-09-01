import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInit } from 'redux/store/userSlice';

import { Button } from './Button.js';
import { Loader } from './Loader';
import 'assets/scss/components.scss';

function Profile() {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserInit());
  }, [dispatch]);

  const { isLoading, user } = userState;

  if (isLoading || user.message !== 'ok') return;
  <div className="flex-center">
    <Loader />
  </div>;

  return (
    <div className="side-box profile">
      <div className="profile-img flex-center">
        <img src={user.data.profileImage} alt="" />
        <div className="profile-name">{user.data.username}</div>
      </div>
      <div className="flex-center">
        <div className="profile-info flex-center">
          <div className="profile-info-title">{user.data.joinCount}</div>
          <div className="profile-info-content">Join</div>
        </div>
        <div className="profile-info flex-center">
          <div className="profile-info-title">{user.data.postCount}</div>
          <div className="profile-info-content">Posts</div>
        </div>
        <div className="profile-info flex-center">
          <div className="profile-info-title">{user.data.commentCount}</div>
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
