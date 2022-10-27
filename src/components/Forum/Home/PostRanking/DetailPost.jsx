import React from 'react';
import LikePost from './LikePost';

function DetailPost({ info }) {
  return (
    <div style={{ border: '1px solid skyblue' }}>
      <LikePost postId={info.postId} likeCnt={info.likeCnt} isLiked={info.isLiked} />
      <div>Badge Info: {info.badge}</div>
      <div>Content:{info.contents}</div>
      <div>Badge Info</div>
    </div>
  );
}

export default DetailPost;
