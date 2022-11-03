import React from 'react';
import { useChannelSettingsContext } from '@sendbird/uikit-react/ChannelSettings/context';
import PlaceHolder, { PlaceHolderTypes } from '@sendbird/uikit-react/ui/PlaceHolder';
import UserAvatar from '../common/UserAvatar.jsx/UserAvatar';
import RoleBadge from '../common/RoleBadge/RoleBadge';

function MemberList() {
  const { channel } = useChannelSettingsContext();

  if (!channel) return <PlaceHolder type={PlaceHolderTypes.LOADING} />;
  const { members } = channel;
  return (
    <div className="custom_list">
      {members.map((member) => {
        const { profileUrl, role, nickname, connectionStatus } = member;
        return (
          <button
            key={`${channel.url}-member-${member.userId}`}
            className="list_item"
            onClick={() => {}}
            onKeyDown={() => {}}
          >
            {/* <button key={Math.random()} className="list_item" onClick={() => {}} onKeyDown={() => {}}> */}
            <div className="member_list_item">
              <div className="member_avatar">
                <UserAvatar imgSrc={profileUrl} />
              </div>
              <div className="member_role">
                <RoleBadge role={role} />
              </div>
              <div className="member_name ellipsis">{nickname}</div>
              <div className="member_status">
                <div className={`${connectionStatus}`} />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default MemberList;
