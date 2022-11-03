/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { showPopup } from 'redux/store/common/popupSlice';
import { reqForumInfo, updateForumInfo } from 'redux/store/forum/forumInfoSlice';
import { reqForumPin, reqForumUnpin } from 'redux/store/forum/forumBookmarkSlice';
import { reqForumBookMarkedList } from 'redux/store/forum/forumBookmarkedSlice';
import userThumb from 'html/img/com/user thumb.png';
import { POPUP_TYPE_BADGE, DATE_FORMAT_WEEK_TO_YEAR } from 'constants/type';
import { getPostDateFormat, addComma } from 'util/common.js';
import classNames from 'classnames';

function ForumTop({ forumId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    id,
    title,
    // forum_category,
    description,
    banner_image,
    post_count,
    comment_count,
    pin_count,
    thumbnail_image,
    // forum_staffs,
    // forbidden_words,
    // bans,
    is_pined,
    badge,
    user,
    created
  } = useSelector((state) => ({
    ...state.forumInfo
  }));

  const { isActive, isSuccess } = useSelector((state) => ({ ...state.forumPin }));

  const onBookMark = () => {
    if (is_pined) dispatch(reqForumUnpin(id));
    else dispatch(reqForumPin(id));
  };

  useEffect(() => {
    if (forumId) dispatch(reqForumInfo(forumId));
  }, [forumId]);

  useEffect(() => {
    if (isSuccess && isActive !== is_pined) {
      dispatch(reqForumBookMarkedList({ is_pined: 'true' }));
      dispatch(updateForumInfo({ is_pined: isActive }));
    }
  }, [isSuccess]);

  return (
    <div className="top_div">
      <div className="top_img">
        <img src={banner_image} className="top_img" alt="forum top" />
        <button type="button" className={classNames('bookmark', { on: is_pined })} onClick={() => onBookMark()}>
          <span className="a11y">북마크</span>
        </button>
        <div className="forum_master" onClick={() => navigate(`/forum/${id}/init`)} aria-hidden>
          <div>
            <button type="button" className="forum_default_setting" onClick={() => navigate(`/forum/${id}/init`)}>
              <span className="a11y">설정</span>
            </button>
            <div className="forum_master_info">
              <span className="forum_master_profile">
                <img src={userThumb} alt="userImg" />
              </span>
              <span className="forum_master_name">{user.username}</span>
            </div>
            <div className="forum_staff_info none">No staff yet</div>
            {/* <div className="forum_master_staff">
              <img src={userThumb} alt="user thumb" />
              <img src={userThumb} alt="user thumb" />
              <img src={userThumb} alt="user thumb" />
              <span className="forum_staff_info">
                Staff by <span>nickname</span> and <span>3 others</span>
              </span>
            </div> */}
          </div>
        </div>
        <div className="forum_rank">
          <div className="forum_rank_img">
            <img src={thumbnail_image} alt="user thumb" />
          </div>
          <div className="forum_rank_info">
            <span className="rank_badge_small gold none" />
            {/* <span className="forum_rank_num">01</span> */}
            {/* <span className="ranknum up">652</span> */}
          </div>
        </div>
        <div className="forum_top_badge">
          {badge[0] === 1 && <span className="forum_badge new" />}
          {badge[1] === 1 && <span className="forum_badge amazing" />}
          {badge[2] === 1 && <span className="forum_badge best_live" />}
          {badge[3] === 1 && <span className="forum_badge best_weekly" />}
          {badge[5] === 1 && <span className="forum_badge rising_forum" />}
          {badge[6] === 1 && <span className="forum_badge nice" />}
          <div>
            <button
              type="button"
              className="forum_guide open_tip"
              onClick={() => dispatch(showPopup({ type: POPUP_TYPE_BADGE }))}
            >
              <span className="a11y">뱃지가이드</span>
            </button>
            <div className="tooltip bottom">
              <span>Badge View</span>
            </div>
          </div>
        </div>
      </div>
      <div className="forum_info">
        <dl className="forum_name">
          <dt>
            {title}
            <span className="forum_start_date">Since {getPostDateFormat(created, DATE_FORMAT_WEEK_TO_YEAR)}</span>
          </dt>
          <dd>{description}</dd>
        </dl>
        <div className="forum_total_num">
          <dl>
            <dt>{addComma(post_count)}</dt>
            <dd>Posts</dd>
          </dl>
          <dl>
            <dt>{addComma(comment_count)}</dt>
            <dd>Comments</dd>
          </dl>
          <dl>
            <dt>{addComma(pin_count)}</dt>
            <dd>Bookmarks</dd>
          </dl>
        </div>
      </div>
      {/* <BadgeModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} /> */}
    </div>
  );
}

export default ForumTop;
