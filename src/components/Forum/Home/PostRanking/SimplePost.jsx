import React from 'react';
import userThumbImg from 'html/img/com/user thumb.png';
import thumbImg from 'html/img/com/thumb.png';
// import ForumThumb01 from 'html/img/com/forum_thumb_01.png';

function SimplePost({ item }) {
  const { forumName } = item;
  return (
    <li>
      <dl className="forum_thum_list small">
        <dt className="forum_thum_img">
          <img src={thumbImg} alt="" />
          <div className="rank">
            <span className="rank_badge_small gold" />
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
                <img src={userThumbImg} alt="" />
              </div>
              <dl>
                <dt className="user_name">ghr4df31467a1b..</dt>
                <dd className="user_date">23h ago</dd>
              </dl>
            </div>
            <div className="text">
              How to get a ban pick in T1 is very simple. The first thing to reme mber when you play thing to reme mber
            </div>
          </div>
        </dt>
        <dd className="forum_thum_name">{forumName}</dd>
        <dd className="forum_thum_text">
          <span className="msg">
            How to win ban pick in T1 <span className="num">(32)</span>
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
          <span>38M</span>
        </div>
      </div>
    </li>
  );
}

export default SimplePost;
