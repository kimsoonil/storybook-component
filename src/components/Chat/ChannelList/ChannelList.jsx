import React, { useCallback, useEffect } from 'react';
import { useChannelListContext } from '@sendbird/uikit-react/ChannelList/context';
import PlaceHolder, { PlaceHolderTypes } from '@sendbird/uikit-react/ui/PlaceHolder';

function CustomChannelList({ setCurrentChannel }) {
  const { currentChannel, allChannels, initialized, loading, channelListDispatcher } = useChannelListContext();

  const selectChannel = useCallback((channel) => {
    setCurrentChannel(channel.url);
    channelListDispatcher({
      type: 'SET_CURRENT_CHANNEL',
      payload: channel
    });
  }, []);

  useEffect(() => {
    if (!currentChannel) return;
    selectChannel(currentChannel);
  }, [currentChannel]);

  // if (!initialized) return <PlaceHolder type={PlaceHolderTypes.WRONG} />;
  if (loading || !initialized) return <PlaceHolder type={PlaceHolderTypes.LOADING} />;

  return (
    <div className="custom_list">
      {allChannels.map((channel) => (
        <button
          key={`channel-${channel.url}`}
          className={`list_item ${channel.url === currentChannel.url && 'selected'}`}
          onClick={() => selectChannel(channel)}
          onKeyDown={() => {}}
        >
          <div className="channel_list_item">
            <img className="channel_img" src={channel.coverUrl} alt="" />
            <div className="channel_description">
              <div className="channel_name ellipsis">
                <p>{channel.name}</p>
              </div>
              <div className="channel_additional_info ellipsis">{channel.lastMessage.message}</div>
            </div>
            <div className="channel_list_action">
              {channel.unreadMessageCount > 0 ? (
                <div className="message_count">
                  <div>{channel.unreadMessageCount}</div>
                </div>
              ) : (
                <div />
              )}
              <div className="channel_type_icons">
                <div className="ic_lock_bk" />
              </div>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default CustomChannelList;
