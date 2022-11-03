/* eslint-disable */

import React from 'react';

import { useNavigate } from 'react-router-dom';

function PrevPost(props) {
  const navigate = useNavigate();
  return (
    <div
      className="posts-lists-container-item"
      onClick={() => navigate(`/${props.type}/${props.id}/post/${props.prev.id}`, { replace: true })}
    >
      <div className="mr-3">
        <div className="posts-lists-container-name">{props?.prev?.user?.username}</div>
        <div className="posts-lists-container-title">{props?.prev?.title}</div>
        <div className="posts-lists-container-content">{props?.prev?.content_summary}</div>
      </div>
      <div className="posts-lists-container-img">
        <img src={props?.prev?.thumbnail_image_url} />
      </div>
    </div>
  );
}

export default PrevPost;
