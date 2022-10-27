import React from 'react';
import postThumb from 'html/img/com/post_thumb_01.png';
// import RankingSlide from 'components/Forum/Home/ForumRanking/RankingSlide';

function PostItem() {
  return (
    <div>
      <dl>
        <dt>
          <img src={postThumb} alt="" />
          <div className="forum_badge_area">
            <span className="post_badge new" />
          </div>
        </dt>
        <dd className="post_title">
          New Forum Post Title <span>(0)</span>
        </dd>
        <dd className="post_info">
          <div className="emoji_group">
            <span className="emoji_num none">0</span>
          </div>
          <div className="view_num">
            <span>0</span>
          </div>
        </dd>
      </dl>
    </div>
  );
}

function BestPost() {
  const list = [1, 2, 3];
  return (
    <div className="best_post">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Best Post</h4>
      </div>
      <div className="forum_best_post_list">
        <div className="swiper">
          <button type="button" className="swiper_button left">
            <span className="a11y">좌측으로</span>
          </button>
          <div className="swiper_img">
            {/* <RankingSlide> */}
            {list.map(() => (
              <PostItem />
            ))}
            <PostItem />
            {/* </RankingSlide> */}
          </div>
          <button type="button" className="swiper_button right">
            <span className="a11y">우측으로</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BestPost;
