import React from 'react';
import LikePost from './LikePost';

function SimplePost({ item }) {
  return (
    <>
      <span>{item.forumName}</span>
      <LikePost postId={item.postId} likeCnt={item.likeCnt} isLiked={item.isLiked} />
      <span>{item.img}</span>
      <span>{item.postsCnt}</span>
      <span>{item.commentCnt}</span>
      <span>{item.viewCnt}</span>
      <span>{item.contents}</span>
      <span>{item.postName}</span>
    </>
  );
}

export default SimplePost;
