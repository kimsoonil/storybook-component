import React from 'react';
import useLikePost from 'hook/useLikePost';
import { setLikePost } from 'redux/store/forum/latestPostsSlice';

function LikePost({ postId, isLiked, likeCnt }) {
  const [onLikePost] = useLikePost(setLikePost);

  return (
    <span
      id={postId}
      key={postId}
      style={{ backgroundColor: isLiked ? 'pink' : 'white', margin: '10px' }}
      onClick={!isLiked ? onLikePost : null}
      aria-hidden="true"
    >
      ##Like:{likeCnt}##
    </span>
  );
}

export default React.memo(LikePost);
