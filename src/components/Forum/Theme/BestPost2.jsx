/* eslint-disable camelcase */
import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
// import RankingSlide from 'components/Forum/Home/ForumRanking/RankingSlide';
// import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';
import RankingSlide from 'components/Forum/Home/ForumRanking/RankingSlide';
import { useNavigate } from 'react-router';

function PostItem({ item, navigate, forumId, idx }) {
  const { title, comment_count, visit_count, thumbnail_image_url, id } = item;
  return (
    <div onClick={() => navigate(`/forum/${forumId}/post/${id}`)} aria-hidden>
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
        </dt>
        <dd className="forum_thum_text">
          <span className="msg">
            {title} <span className="num">({comment_count})</span>
          </span>
        </dd>
      </dl>
      <div className="forum_thum_list_info">
        <div className="emoji_group">
          <span className="emoji like" />
          <span className="emoji fun" />
          <span className="emoji_num">926</span>
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
  const navigate = useNavigate();
  // useEffect(() => {
  //   dispatch(reqForumIdPostList({ forumId, page_size: 10 }));
  // }, []);
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
                <PostItem key={item} item={item} navigate={navigate} forumId={forumId} idx={idx} />
              ))}
            </RankingSlide>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BestPost;
