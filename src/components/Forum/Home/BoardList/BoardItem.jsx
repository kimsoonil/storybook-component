/* eslint-disable camelcase */
import React from 'react';
import { useNavigate } from 'react-router';

function BoardItem({ info }) {
  const { title, description, thumbnail_image, id } = info;
  const navigate = useNavigate();
  return (
    <li onClick={() => navigate(`/forum/${id}/theme`)} aria-hidden>
      <dl>
        <dt>
          <div className="badge">
            {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge new" />}
            {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge excellent" />}
            {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge best_live_simple" />}
            {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge recommend_forum" />}
          </div>
          <div className="badge_over" />
          <img src={thumbnail_image} alt="" />
        </dt>
        <dd className="simul_title">{title}</dd>
        <dd className="simul_text">{description}</dd>
      </dl>
    </li>
  );
}

export default BoardItem;
