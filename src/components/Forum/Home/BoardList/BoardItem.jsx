import React from 'react';
import ForumThumb01 from 'html/img/com/forum_thumb_01.png';

function BoardItem() {
  return (
    <li>
      <dl>
        <dt>
          <div className="badge">
            <span className="forum_badge new" />
            <span className="forum_badge excellent" />
            <span className="forum_badge best_live_simple" />
            <span className="forum_badge recommend_forum" />
          </div>
          <img src={ForumThumb01} alt="" />
        </dt>
        <dd className="simul_title">YOMIURI GIANTS Official Fan Board</dd>
        <dd className="simul_text">
          Let’s follow their own league, the big giant of Japanese baseball! No one can stop us.
        </dd>
      </dl>
    </li>
  );
}

export default BoardItem;
