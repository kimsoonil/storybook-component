/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
// import { useDispatch } from 'react-redux';
import { getPostDateFormat } from 'util/common.js';
import { DATE_FORMAT_WEEK_TO_YEAR } from 'constants/type';
import { useNavigate } from 'react-router';

function PostList({ info }) {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  // const onBookMark = (item) => {
  // };

  return (
    <ul className="forum_list">
      {info?.map((item) => (
        <li key={item.id} onClick={() => navigate(`/forum/${item.forum}/post/${item.id}`)} aria-hidden>
          <div className="forum_list_img">
            <img src={item.thumbnail_image_url} alt="" />
          </div>
          <dl>
            <dt>{item.forum_title}</dt>
            <dd className="forum_title">
              <span className="forum_title_text">{item.title} #356</span>
              <span className="forum_comment">({item.comment_count})</span>
            </dd>
            <dd className="forum_name">
              <span>{item.user?.username}</span>
              <span>{getPostDateFormat(item.created, DATE_FORMAT_WEEK_TO_YEAR)}</span>
            </dd>
          </dl>
          <div className="emoji_group">
            {/* <span className="emoji like">{item.like_count}</span> */}
            <span className="emoji devil" />
            <span className="emoji fun" />
            <span className="emoji_num">{item.visit_count}</span>
          </div>
          <div className="view_num">
            <div className="list_view_icon">
              <button type="button" className="share">
                <span className="a11y">공유하기</span>
              </button>
              <button type="button" className={classNames('bookmark', { on: item.is_pined })}>
                <span className="a11y">북마크</span>
              </button>
            </div>
            <span>{item.visit_count}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostList;
