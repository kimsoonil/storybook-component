import React, { useCallback, useState } from 'react';
import UserAvatar from '../common/UserAvatar.jsx/UserAvatar';
import { changeToDate } from '../../../util/messageUtils';

function ChannelHeader({ coverUrl, name, notices, memberCount, SetMemberList }) {
  // memberCount, SetMemberList
  const [noticeIndex, setNoticeIndex] = useState(notices.length > 0 ? notices.length - 1 : 0);
  const changeNoticeIndex = useCallback(
    (n) => {
      const newIndex = n + noticeIndex;
      if (newIndex >= 0 && newIndex < notices.length) setNoticeIndex(newIndex);
    },
    [noticeIndex]
  );

  return (
    <>
      <div className="channel_header">
        <div className="header_inner">
          <div className="header_main">
            <img src={coverUrl} alt="" />
            <div className="header_title_description">
              <div className="header_title">
                <div className="title ellipsis">{name}</div>
                <div className="action_icons">
                  <button className="more_button" alt="" aria-label="more" />
                </div>
              </div>
              <div className="header_bottom">
                <div className="header_description ellipsis">{`Welcome to ${name}.`}</div>
                <div className="header_memberCount">
                  <button onClick={() => SetMemberList((memberList) => !memberList)} className="member_display">
                    <span>
                      Members
                      <span>{memberCount}</span>/ 100
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notices.length > 0 && (
        <div className="notices">
          <div className="notice_avatar">
            <UserAvatar />
          </div>
          <div className="notice_info">
            <div className="notice_message">{notices[noticeIndex].message}</div>
            <div className="notice_time">{changeToDate(notices[noticeIndex].createdAt)}</div>
          </div>
          <div className="control_buttons">
            <button className="button_prev" onClick={() => changeNoticeIndex(-1)} alt="" aria-label="prev" />
            <button className="button_next" onClick={() => changeNoticeIndex(+1)} alt="" aria-label="next" />
          </div>
        </div>
      )}
    </>
  );
}

export default ChannelHeader;
