import React from 'react';
import { useDispatch } from 'react-redux';
import { reqlatestPosts } from 'redux/store/forum/latestPostsSlice';
import forumSwiper from 'html/img/com/swiper_thumbnail.png';

function ForumDetail({ info }) {
  const dispatch = useDispatch();
  const onLoadPostList = () => {
    dispatch(reqlatestPosts({ forumId: info.forumId }));
  };

  return (
    <div onClick={onLoadPostList} aria-hidden="true">
      <img src={forumSwiper} alt="true" />
      <div className="swiper_badge">
        <span className="rank_badge_big gold" />
        <span className="ranknum down">23</span>
      </div>
      <div className="swiper_over">
        <span className="category">PHOTO</span>
        <dl>
          <dt>Black &amp; White Nights</dt>
          <dd>
            The 5 owners of “Black &amp; White Nights : The Afterparty” will be the first five people to select any
            piece they like .. from “Black &amp; White Days” before I release it to the public, and I’ll give them that
            piece for free.
          </dd>
        </dl>
      </div>
    </div>
  );
}

export default ForumDetail;
