/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
// import RankingSlide from 'components/Forum/Home/ForumRanking/RankingSlide';
import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';
import RankingSlide from 'components/Forum/Home/ForumRanking/RankingSlide';

function PostItem({ item, idx }) {
  const { title, content_summary, visit_count, like_count, thumbnail_image_url } = item;
  return (
    <div>
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
            {Math.floor(Math.random() * 2) === 1 && <span className="post_badge new" />}
            {Math.floor(Math.random() * 2) === 1 && <span className="post_badge great" />}
          </div>
        </dt>
        <dd className="forum_thum_text">
          <span className="msg">
            {title} <span className="num">({content_summary})</span>
          </span>
        </dd>
      </dl>
      <div className="forum_thum_list_info">
        <div className="emoji_group">
          {/* 좋아요 종류 */}
          <span className="emoji like" />
          <span className="emoji fun" />
          <span className="emoji_num">{like_count}</span>
        </div>
        <div className="view_num">
          <span>{visit_count}</span>
        </div>
      </div>
    </div>
  );
}

function BestPost({ forumId }) {
  const { forumIdPostList } = useSelector((state) => ({ ...state.forumIdPostList }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqForumIdPostList({ forumId, page_size: 10 }));
  }, []);
  return (
    <div className="best_post">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Best Post</h4>
      </div>
      <div className="forum_best_post_list">
        <div className="swiper">
          <div className="swiper_img">
            <RankingSlide slideCount={5}>
              {forumIdPostList.map((item, idx) => (
                <PostItem key={item} item={item} idx={idx} />
              ))}
            </RankingSlide>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestPost;
