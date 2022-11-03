/* eslint-disable camelcase */
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

function ForumItem({ info, onMove }) {
  const { thumbnail_image, description, forum_category } = info;
  return (
    <li onClick={onMove} aria-hidden>
      <div className="new_forum_img">
        <img src={thumbnail_image} alt="" />
      </div>
      <dl>
        <dt>
          <span>{forum_category.title}</span>
        </dt>
        <dd>{description}</dd>
      </dl>
    </li>
  );
}

function NewForums() {
  const navigate = useNavigate();
  const { rankingList } = useSelector((state) => ({ ...state.forumRankingList }));
  return (
    <div className="new_forum">
      <div className="content_subtitle">
        <h4 className="h4Type eng">New Forums</h4>
        {/* <div className="title_menu">
          <button type="button" className="text_btn">
            <span>See All</span>
          </button>
        </div> */}
      </div>
      <ul className="new_forum_list">
        {rankingList?.map(
          (item, idx) =>
            idx < 5 && <ForumItem key={item.id} info={item} onMove={() => navigate(`/forum/${item.id}/theme`)} />
        )}
      </ul>
    </div>
  );
}

export default NewForums;
