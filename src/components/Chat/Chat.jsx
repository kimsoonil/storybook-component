/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import SendbirdProvider from '@sendbird/uikit-react/SendbirdProvider';
import { ChannelProvider } from '@sendbird/uikit-react/Channel/context';
import { ChannelListProvider } from '@sendbird/uikit-react/ChannelList/context';
import { ChannelSettingsProvider } from '@sendbird/uikit-react/ChannelSettings/context';
import { getStorage } from '../../util/storage';
import '@sendbird/uikit-react/dist/index.css';
import Channel from './Channel/Channel';
import ChannelList from './ChannelList/ChannelList';
import ListHeader from './common/ListHeader/ListHeader';
import Profile from './Profile/Profile';
import MemberList from './MemberList/MemberList';

const local = getStorage('persist:root');
const { account_id, nickname } = JSON.parse(JSON.parse(local).logIn).user;

function Chat() {
  useEffect(() => {
    let timeout;
    const { outerWidth, outerHeight } = window;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        console.log('resizeEnd');
        window.resizeTo(outerWidth, outerHeight);
      }, 250);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.classList.add('body_chat');
  }, []);

  const [currentChannelUrl, SetCurrentChannelUrl] = useState('');
  const [memberList, SetMemberList] = useState(true);
  const [toolbar, SetToolbar] = useState(false);

  return (
    <div className="chat_main_div">
      <SendbirdProvider appId="AE468074-7252-4F34-B74B-63AAC9359590" userId={`${account_id}`} nickname={`${nickname}`}>
        {toolbar && (
          <div
            className="toolbar"
            onMouseLeave={() => {
              if (toolbar) SetToolbar(false);
            }}
          >
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        )}
        <div className="chat_div">
          <button
            aria-label="toolbar"
            className="toolbar_handle"
            onClick={() => {
              if (!toolbar) SetToolbar(true);
            }}
          />
          <div className="side_div">
            <ChannelListProvider
              channelUrl={currentChannelUrl}
              className="sendbird_channel_list_provider"
              allowProfileEdit
            >
              <div className="profile chat_widget">
                <Profile />
              </div>
              <div className="channel chat_widget">
                <ListHeader title="Channel" />
                <ChannelList setCurrentChannel={SetCurrentChannelUrl} />
              </div>
            </ChannelListProvider>
          </div>
          <div className="center_div">
            <div className="chat chat_widget">
              <ChannelProvider className="sendbird_channle_provider" channelUrl={currentChannelUrl}>
                <Channel SetMemberList={SetMemberList} />
              </ChannelProvider>
            </div>
          </div>
          {memberList && (
            <div className="side_div">
              <ChannelSettingsProvider className="sendbird_channel_list_provider" channelUrl={currentChannelUrl}>
                <div className="member chat_widget">
                  <ListHeader title="Members" />
                  <MemberList />
                </div>
              </ChannelSettingsProvider>
            </div>
          )}
        </div>
      </SendbirdProvider>
    </div>
  );
}

export default Chat;
