/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable camelcase */
import React from 'react';
// import userThumbImg from 'html/img/com/user thumb.png';
import classNames from 'classnames';
import { getPostDateFormat } from 'util/common.js';
import { DATE_FORMAT_WEEK_TO_YEAR } from 'constants/type';
import { useNavigate } from 'react-router';

function SimplePost({ item, idx }) {
  const {
    thumbnail_image_url,
    title,
    created,
    like_count,
    dislike_count,
    comment_count,
    visit_count,
    content_summary,
    user,
    id,
    forum,
    forum_title
  } = item;
  const navigate = useNavigate();
  console.log('content', item);
  return (
    <li onClick={() => navigate(`/forum/${forum}/post/${id}`)} aria-hidden>
      <dl className="forum_thum_list small">
        <dt className="forum_thum_img">
          <img src={thumbnail_image_url} alt="" />
          <div className="rank">
            <span
              className={classNames(
                'rank_badge_small',
                { gold: idx === 0 },
                { silver: idx === 1 },
                { bronze: idx === 2 },
                { normal: idx > 2 }
              )}
            >
              {idx > 2 && <span>{idx + 1}</span>}
            </span>
          </div>
          <div className="best">
            <span className="post_badge_best live" />
          </div>
          <div className="badge">
            <span className="post_badge new" />
            <span className="post_badge great" />
          </div>
          <div className="img_over">
            <div className="user_info">
              <div className="user_thum">
                <img src={user?.profile_image_url} alt="" />
              </div>
              <dl>
                <dt className="user_name">{user.username}</dt>
                <dd className="user_date">{getPostDateFormat(created, DATE_FORMAT_WEEK_TO_YEAR)}</dd>
              </dl>
            </div>
            {/* eslint-disable-next-line react/no-danger */}
            <div className="text">{content_summary}</div>
          </div>
        </dt>
        <dd className="forum_thum_name">{forum_title}</dd>
        <dd className="forum_thum_text">
          <span className="msg">
            {title} <span className="num">({comment_count})</span>
          </span>
        </dd>
      </dl>
      <div className="forum_thum_list_info">
        <div className="emoji_group">
          <span className="emoji like">{like_count}</span>
          <span className="emoji fun">{dislike_count}</span>
          <span className="emoji_num">{visit_count}</span>
        </div>
        <div className="view_num">
          <span>{visit_count}</span>
        </div>
      </div>
    </li>
  );
}

export default SimplePost;
