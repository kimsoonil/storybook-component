import React from 'react';
import defaultAvatar from '../../../../html/img/chat/avatar.png';

function UserAvatar({ imgSrc }) {
  if (!imgSrc) imgSrc = defaultAvatar;

  return (
    <div className="user_avatar">
      <div className="user_avatar_img">
        <img src={imgSrc} alt="" />
      </div>
    </div>
  );
}

export default UserAvatar;
