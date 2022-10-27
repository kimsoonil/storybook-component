import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import { showPopup } from 'redux/store/common/popupSlice';
import userThumb from 'html/img/com/user thumb.png';
import forumTopimg from 'html/img/com/forum_topimg.png';
import { POPUP_TYPE_BADGE } from 'constants/type';

function ForumTop() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  return (
    <div className="top_div">
      <div className="top_img">
        <img src={forumTopimg} className="top_img" alt="forum top" />
        <button type="button" className="bookmark on">
          <span className="a11y">북마크</span>
        </button>
        <div className="forum_master">
          <div>
            <button
              type="button"
              className="forum_default_setting"
              onClick={() => navigate(`/forum/init/${params.id}`)}
            >
              <span className="a11y">설정</span>
            </button>
            <div className="forum_master_info">
              <span className="forum_master_profile">
                <img src={userThumb} alt="userImg" />
              </span>
              <span className="forum_master_name">ONCE : Twice_master</span>
            </div>
            <div className="forum_master_staff">
              <img src={userThumb} alt="user thumb" />
              <img src={userThumb} alt="user thumb" />
              <img src={userThumb} alt="user thumb" />
              <span className="forum_staff_info">
                Staff by <span>nickname</span> and <span>3 others</span>
              </span>
            </div>
          </div>
        </div>
        <div className="forum_rank">
          <div className="forum_rank_img">
            <img src={userThumb} alt="user thumb" />
          </div>
          <div className="forum_rank_info">
            <span className="rank_badge_small gold none" />
            <span className="forum_rank_num">01</span>
            <span className="ranknum up">652</span>
          </div>
        </div>
        <div className="forum_top_badge">
          <span className="forum_badge new" />
          <span className="forum_badge amazing" />
          <span className="forum_badge best_live" />
          <span className="forum_badge best_weekly" />
          <span className="forum_badge rising_forum" />
          <span className="forum_badge recommend_forum" />
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
            ONCE ♥︎ TWICE<span className="forum_start_date">Since Sep. 4, 2021</span>
          </dt>
          <dd>
            This is TWICE’s official fan club, ONCE. Let’s share a lot of pretty TWICE photos and videos as a place to
            communi cate and cheer with TWICE members.
          </dd>
        </dl>
        <div className="forum_total_num">
          <dl>
            <dt>92.1K</dt>
            <dd>Posts</dd>
          </dl>
          <dl>
            <dt>14.9K</dt>
            <dd>Comments</dd>
          </dl>
          <dl>
            <dt>1,653</dt>
            <dd>Bookmarks</dd>
          </dl>
        </div>
      </div>
      {/* <BadgeModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} /> */}
    </div>
  );
}

export default ForumTop;
