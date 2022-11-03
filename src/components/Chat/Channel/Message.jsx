import React from 'react';
import UserAvatar from '../common/UserAvatar.jsx/UserAvatar';
import deleteButton from '../../../html/img/ico/ic_trash_gr.png';
import { changeToDate } from '../../../util/messageUtils';

function Message({ msg, handleDeleteMessage, mine }) {
  const { sender, createdAt, url, message } = msg;

  // 파일 첨부 메세지
  //   if (url) {
  //     return (
  //       <div className="message_item">2</div>
  //       //   <div className={`message  ${mine && 'message-from-you'}`}>
  //       //     <div className="message-user-info">
  //       //       <div className="message-sender-name">{message.sender.nickname} </div>
  //       //       <div>2222222</div>
  //       //       {/* <div>{timestampToTime(message.createdAt)}</div> */}
  //       //     </div>
  //       //     {/* <img src={message.url} /> */}
  //       //   </div>
  //     );
  //   }

  // const messageSentByCurrentUser = message.sender.userId === sb.currentUser.userId;

  if (!sender) return <div />;
  const { plainProfileUrl, nickname } = sender;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <div className={`message_item ${mine && 'mine'}`}>
      <div className="message_avatar">
        <UserAvatar imgSrc={plainProfileUrl} />
      </div>
      <div className="message_author_contents">
        <div className="message_author">{nickname}</div>
        <div className="message_contents">
          <div className="contents">
            {url ? (
              <div className="contents_image">
                <img src={url} alt="" />
              </div>
            ) : (
              <p>{message}</p>
            )}
          </div>

          <div className="send_time">
            <p>{changeToDate(createdAt)}</p>
          </div>
        </div>
      </div>
      <div className="control-bottons">
        <button className="delete-button" onClick={() => handleDeleteMessage(msg)}>
          <img className="message-icon" src={deleteButton} alt="" />
        </button>
      </div>
    </div>
  );
}
export default Message;
