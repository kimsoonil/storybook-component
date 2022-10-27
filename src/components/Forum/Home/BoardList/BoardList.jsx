import React from 'react';
import BoardItem from './BoardItem';

function BoardList({ title }) {
  const list = [
    { id: 1, contents: 'test1' },
    { id: 2, contents: 'test2' },
    { id: 3, contents: 'test3' },
    { id: 4, contents: 'test4' },
    { id: 5, contents: 'test5' },
    { id: 6, contents: 'test6' }
  ];
  return (
    <div className="board_list">
      <div className="content_subtitle">
        <h4 className="h4Type eng">{title}</h4>
        <div className="btn_right_align">
          <div className="count_group">
            <span className="forum_count">135</span>
            <span className="post_count">23,242</span>
            <span className="comment_count">646,348</span>
          </div>
          <div className="title_menu">
            <button type="button" className="text_btn">
              <span>See all</span>
            </button>
          </div>
        </div>
      </div>
      <ul className="board_thum">
        {list.map((item) => (
          <BoardItem info={item} key={item.id} />
        ))}
        {/* <li>
          <dl>
            <dt>
              <div className="badge">
                <span className="forum_badge new" />
                <span className="forum_badge excellent" />
                <span className="forum_badge best_live_simple" />
                <span className="forum_badge recommend_forum" />
              </div>
              <img src="../../img/com/forum_thumb_01.png" />
            </dt>
            <dd className="simul_title">YOMIURI GIANTS Official Fan Board</dd>
            <dd className="simul_text">
              Let’s follow their own league, the big giant of Japanese baseball! No one can stop us.
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../../img/com/forum_thumb_01.png" />
            </dt>
            <dd className="simul_title">CyberKongz - Forum</dd>
            <dd className="simul_text">
              CyberKongz are unique and randomly generated 2D/3D NFT Social Avatars for your online experiences. Some
              appear normal. Some look weirdsfsdfsfsfdf.
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../../img/com/forum_thumb_01.png" />
            </dt>
            <dd className="simul_title">YOMIURI GIANTS Official Fan Board</dd>
            <dd className="simul_text">
              Let’s follow their own league, the big giant of Japanese baseball! No one can stop us.
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../../img/com/forum_thumb_01.png" />
            </dt>
            <dd className="simul_title">YOMIURI GIANTS Official Fan Board</dd>
            <dd className="simul_text">
              Let’s follow their own league, the big giant of Japanese baseball! No one can stop us.
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../../img/com/forum_thumb_01.png" />
            </dt>
            <dd className="simul_title">YOMIURI GIANTS Official Fan Board</dd>
            <dd className="simul_text">
              Let’s follow their own league, the big giant of Japanese baseball! No one can stop us.
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>
              <img src="../../img/com/forum_thumb_01.png" />
            </dt>
            <dd className="simul_title">YOMIURI GIANTS Official Fan Board</dd>
            <dd className="simul_text">
              Let’s follow their own league, the big giant of Japanese baseball! No one can stop us.
            </dd>
          </dl>
        </li> */}
      </ul>
    </div>
  );
}

export default BoardList;
