import React from 'react';
import userThumbImg from 'html/img/com/user thumb.png';
import bestForumThumbImg from 'html/img/com/forum_best_Thumb.png';
import { dateCalculation } from 'utils/dateCalculation';
import { useNavigate } from 'react-router-dom';

function Item(props) {
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(`/forum/1/post/${props.info.id}`)}>
      <dl className="forum_thum_list big">
        <dt className="forum_thum_img">
          <img src={bestForumThumbImg} alt="" />
          {/* 순위는 1~3위까지만 */}
          <div className="rank">
            <span className="rank_badge_small gold" />
          </div>
          {/* 뱃지는 최대 4개까지 */}
          <div className="best">
            <span className="post_badge_best live" />
          </div>
          {/* 뱃지는 최대 2개까지 */}
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
                <dt className="user_name">{props.info.name}</dt>
                <dd className="user_date">{dateCalculation(props.info.created)}</dd>
              </dl>
            </div>
            <div className="text" dangerouslySetInnerHTML={{ __html: props.info.content }}></div>
          </div>
        </dt>
        <dd className="forum_thum_text">
          <span className="msg">
            {props.info.title}
            <span className="num">({props.info.comment_count})</span>
          </span>
        </dd>
      </dl>
      <div className="forum_thum_list_info">
        <div className="emoji_group">
          <span className="emoji like" />
          <span className="emoji fun" />
          <span className="emoji_num">{props.info.like_count}</span>
        </div>
        <div className="view_num">
          <span>{props.info.visit_count}</span>
        </div>
      </div>
    </li>
  );
}

export default Item;
