/* eslint-disable */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import PrevPost from './PrevPost';
import NextPost from './NextPost';
function PostConent(props) {
  const navigate = useNavigate();
  const listNavigate = () => {
    if (props.type === 'club') {
      navigate(`/club/${props?.id}/board/${props?.post?.data?.board}`);
    } else {
      navigate(`/fourm/${props?.id}/theme`);
    }
  };
  if (props?.prev === null && props?.next === null) return <div></div>;
  return (
    <div className="posts-lists club-home-content">
      <div className="flex-between posts-lists-header">
        <div className="posts-lists-title ">
          <div className="posts-lists-nav">
            {props?.post?.data?.board_group_title} &gt; {props?.post?.data?.board_title}
          </div>
          <div>Board writing</div>
        </div>
        <div className="see-all" onClick={() => listNavigate()}>
          See all
        </div>
      </div>
      <div className="flex-between posts-lists-explain">
        <div>Prev</div>
        <div>Next</div>
      </div>
      <div className="posts-lists-container">
        {props?.prev !== null ? (
          <PrevPost id={props?.id} prev={props?.prev} type={props.type} />
        ) : (
          <div className="posts-lists-container-item" />
        )}
        {props?.next !== null ? (
          <NextPost id={props?.id} next={props?.next} type={props.type} />
        ) : (
          <div className="posts-lists-container-item" />
        )}
      </div>
    </div>
  );
}

export default PostConent;
