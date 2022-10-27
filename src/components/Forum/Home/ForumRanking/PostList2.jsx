import React from 'react';
import { useSelector } from 'react-redux';
import Thumb01 from 'html/img/com/post_thumb_01.png';

function PostList2() {
  const { list } = useSelector((state) => ({ ...state.latestPosts }));
  return (
    <ul className="forum_list">
      {list?.map((item) => (
        <li>
          <div className="forum_list_img" style={{ background: `url(${Thumb01})` }} />
          <dl>
            <dt>{item.postName}</dt>
            <dd className="forum_title">
              <span className="forum_title_text">omgkirby GENESIS #356</span>
              <span className="forum_comment">(32)</span>
            </dd>
            <dd className="forum_name">
              <span>Writer Name</span>
              <span>1h ago</span>
            </dd>
          </dl>
          <div className="forum_emoji">
            <span className="emoji like" />
            <span className="emoji devil" />
            <span className="emoji fun" />
            <span className="emoji_num">1,320</span>
          </div>
          <div className="view_num">
            <span>3,467</span>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default PostList2;
