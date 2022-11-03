/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';

function ForumDetail({ info, idx }) {
  const { id, forum_category, title, description, thumbnail_image } = info;
  const dispatch = useDispatch();
  const onLoadPostList = () => {
    dispatch(reqForumIdPostList({ forumId: id, page_size: 5 }));
  };

  return (
    <div onClick={onLoadPostList} aria-hidden="true">
      <img src={thumbnail_image} alt="true" />
      <div className="swiper_badge">
        {/* <span className="rank_badge_big silver" /> */}
        <span
          className={classNames(
            'rank_badge_big',
            { gold: idx === 0 },
            { silver: idx === 1 },
            { bronze: idx === 2 },
            { normal: idx > 2 }
          )}
        >
          {idx > 2 && <span>{idx + 1}</span>}
        </span>
        <span className="ranknum down">{Math.floor(Math.random() * 2)}</span>
      </div>
      <div className="swiper_over">
        <span className="category">{forum_category.title}</span>
        <dl>
          <dt>Black &amp; {title}</dt>
          <dd>{description}</dd>
        </dl>
      </div>
    </div>
  );
}

export default ForumDetail;
