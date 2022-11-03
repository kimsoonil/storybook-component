import React from 'react';
import { useSendbirdStateContext } from '@sendbird/uikit-react/';
import { useChannelListContext } from '@sendbird/uikit-react/ChannelList/context';
import PlaceHolder, { PlaceHolderTypes } from '@sendbird/uikit-react/ui/PlaceHolder';
import UserAvatar from '../common/UserAvatar.jsx/UserAvatar';
import backgrounds from '../../../html/img/chat/profileBackground';
import micSvg from '../../../html/img/chat/mic.svg';
import headphone from '../../../html/img/chat/headphone.svg';
import RoleBadge from '../common/RoleBadge/RoleBadge';

function Profile() {
  const context = useSendbirdStateContext();
  const { user } = context.stores.userStore;
  const { currentChannel, initialized, loading } = useChannelListContext();

  if (!initialized) return <PlaceHolder type={PlaceHolderTypes.LOADING} />;
  if (loading) return <PlaceHolder type={PlaceHolderTypes.LOADING} />;

  const { plainProfileUrl, nickname } = user;

  const getRoleBadge = () => {
    if (!currentChannel) return <div />;
    const { members } = currentChannel;
    const { role } = members.filter((v) => v.userId === user.userId)[0];
    // 사용자의 채널내 역할(admin, operator 등)은 ChannelListContext의 members에 들어있으므로 id를 이용해 찾아온다.
    return <RoleBadge role={role} />;
  };

  return (
    <div className="custom_profile_card">
      <div className="profile_background" style={{ backgroundImage: `url(${backgrounds[1]})` }}>
        <div className="center_avatar_container">
          <UserAvatar imgSrc={plainProfileUrl} />
        </div>
      </div>
      <div className="name_memo_div">
        <div className="name_div">
          <div className="role_container">{getRoleBadge()}</div>
          <div className="name ellipsis">{nickname}</div>
          <div className="spacer" />
        </div>
        <div className="memo ellipsis">Have a nice day</div>
      </div>
      <div className="bottom_div">
        <div className="controller_mic">
          <img src={micSvg} alt="" />
          <input type="range" defaultValue={0} />
        </div>
        <div className="controller_headphone">
          <img src={headphone} alt="" />
          <input type="range" defaultValue={0} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
