import React, { useState } from 'react';
import withSendbird from '@sendbird/uikit-react/withSendbird';
import sendbirdSelectors from '@sendbird/uikit-react/sendbirdSelectors';
import Modal from '@sendbird/uikit-react/ui/Modal';
// { ModalHeader, ModalBody, ModalFooter }

function ChannelCreatorModal({ createChannel, sdk }) {
  const [channelUrl, setChannelUrl] = useState('');
  return (
    <Modal renderHeader={() => <div>1</div>} renderBody={() => <div>3</div>}>
      {/* <ModalHeader>
            <div>1123123</div>
          </ModalHeader>
          <ModalBody>
            <div>2123123</div>
          </ModalBody> */}

      <button
        onClick={() => {
          // For TypeScript, use const params: GroupChannelCreateParams = {};
          const params = sdk.GroupChannelParams();
          params.isPublic = false;
          params.isEphemeral = false;
          params.isDistinct = false;
          params.addUserIds(['sravan']);
          params.name = 'Test';
          createChannel(params)
            .then((channel) => {
              setChannelUrl(channel.url);
            })
            .catch((error) => console.warn(error));
        }}
      >
        Create channel
      </button>
      {/* <button
        onClick={() => {
          leaveChannel(channelUrl)
            .then(() => {
              setChannelUrl('');
            })
            .catch((error) => console.warn(error));
        }}
      >
        Leave channel
      </button> */}
      <br />
      {`Created channel is: ${channelUrl}`}
    </Modal>
  );
}

const ChannelCreator = withSendbird(ChannelCreatorModal, (state) => {
  const createChannel = sendbirdSelectors.getCreateGroupChannel(state);
  const leaveChannel = sendbirdSelectors.getLeaveGroupChannel(state);
  const sdk = sendbirdSelectors.getSdk(state);
  return { createChannel, sdk, leaveChannel };
});

export default ChannelCreator;
