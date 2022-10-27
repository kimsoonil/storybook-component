import React from 'react';
import chatProfileImg from 'html/img/com/right_thumb.png';

function ForumItem({ info }) {
  return (
    <li>
      <div className="new_forum_img">
        <img src={chatProfileImg} alt="" />
      </div>
      <dl>
        <dt>
          <span>SPORTS</span>
        </dt>
        <dd>SEOUL LG TWINS : {info.constents}</dd>
      </dl>
    </li>
  );
}

function NewForums() {
  const list = [
    { id: 1, constents: 'test1' },
    { id: 2, constents: 'test2' },
    { id: 3, constents: 'test3' },
    { id: 4, constents: 'test4' },
    { id: 5, constents: 'test5' },
    { id: 6, constents: 'test6' },
    { id: 7, constents: 'test7' },
    { id: 8, constents: 'test8' },
    { id: 9, constents: 'test9' },
    { id: 10, constents: 'test10' }
  ];
  return (
    <div className="new_forum">
      <div className="content_subtitle">
        <h4 className="h4Type eng">New Forums</h4>
        <div className="title_menu">
          <button type="button" className="text_btn">
            <span>See All</span>
          </button>
        </div>
      </div>
      <ul className="new_forum_list">
        {list.map((item) => (
          <ForumItem info={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default NewForums;
