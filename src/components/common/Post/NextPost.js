/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router-dom';

function NextPost(props) {
  const navigate = useNavigate();

  return (
    <div
      className="posts-lists-container-item"
      onClick={() => navigate(`/${props.type}/${props.id}/post/${props.next.id}`, { replace: true })}
    >
      <div className="mr-3 ">
        <div className="posts-lists-container-name">{props?.next?.user?.username}</div>
        <div className="posts-lists-container-title">{props?.next?.title}</div>
        <div className="posts-lists-container-content">{props?.next?.content_summary}</div>
      </div>
      <div className="posts-lists-container-img">
        <img src={props?.next?.thumbnail_image_url} />
      </div>
    </div>
  );
}

export default NextPost;
