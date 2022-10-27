import React from 'react';
import todayThumb from 'html/img/com/today_thum.jpg';
import todayList from 'html/img/com/today_list.jpg';

function TodaysForumItem({ info }) {
  return (
    <li>
      <div className="new_forum_img">
        <img src={todayList} alt="" />
      </div>
      <dl>
        <dt>
          <span className="list_title">{info.title} </span>
          <span className="list_num">(232)</span>
        </dt>
        <dd>
          <div className="emoji_group">
            <span className="emoji like" />
            <span className="emoji fun" />
            <span className="emoji_num">926</span>
          </div>
          <div className="view_num">
            <span>3,467</span>
          </div>
        </dd>
      </dl>
    </li>
  );
}

function TodaysForum() {
  const list = [
    { id: 1, title: 'My favorite album is what is love? My favorite' },
    { id: 2, title: 'My favorite album is what is love? My favorite' },
    { id: 3, title: 'My favorite album is what is love? My favorite' },
    { id: 4, title: 'My favorite album is what is love? My favorite' },
    { id: 5, title: 'My favorite album is what is love? My favorite' },
    { id: 6, title: 'My favorite album is what is love? My favorite' }
  ];
  return (
    <div className="today_forum">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Today’s Forum</h4>
      </div>
      <div className="today_forum_thum">
        <img src={todayThumb} alt="" />
        <div className="today_forum_thum_title">
          <span>TWICE - Cheer Up</span>
        </div>
      </div>
      <ul>
        {list.map((item) => (
          <TodaysForumItem info={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default TodaysForum;
