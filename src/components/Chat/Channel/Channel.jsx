import React from 'react';
import { useChannelContext } from '@sendbird/uikit-react/Channel/context';
import PlaceHolder, { PlaceHolderTypes } from '@sendbird/uikit-react/ui/PlaceHolder';
import ChannelUI from '@sendbird/uikit-react/Channel/components/ChannelUI';
import { useSendbirdStateContext } from '@sendbird/uikit-react';
import Message from './Message';
import ChannelHeader from './ChannelHeader';

function Channel({ SetMemberList }) {
  const context = useSendbirdStateContext();
  const { user } = context.stores.userStore;
  const { currentGroupChannel, initialized, allMessages, loading, deleteMessage } = useChannelContext();

  // if (!initialized) return <PlaceHolder type={PlaceHolderTypes.WRONG} />;
  if (loading || !initialized) return <PlaceHolder type={PlaceHolderTypes.LOADING} />;

  const notices = allMessages.filter((v) => v.messageType === 'admin');
  const { coverUrl, name, memberCount } = currentGroupChannel;

  return (
    <ChannelUI
      renderChannelHeader={() => (
        <ChannelHeader
          coverUrl={coverUrl}
          name={name}
          memberCount={memberCount}
          notices={notices}
          SetMemberList={SetMemberList}
        />
      )}
      renderCustomSeparator={() => <div />}
      renderMessage={(v) => {
        if (!v.message.sender || v.message.messageType === 'admin') return;
        // eslint-disable-next-line consistent-return
        return (
          <Message msg={v.message} handleDeleteMessage={deleteMessage} mine={v.message.sender.userId === user.userId} />
        );
      }}
      //   renderMessage={() => <div />}
    />
  );
}

export default Channel;
