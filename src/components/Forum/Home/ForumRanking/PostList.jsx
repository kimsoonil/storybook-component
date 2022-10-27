import React from 'react';
import { useSelector } from 'react-redux';
import LikePost from './LikePost';

function PostList() {
  const { list } = useSelector((state) => ({ ...state.latestPosts }));
  // getPostDateFomat('2002-09-20 16:00', DATE_FORMAT_SHORT_FORM);
  return (
    <div
      style={{
        width: '85vw',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridGap: '20px'
      }}
    >
      {list?.map((item) => (
        <div style={{ margin: '10px' }} key={item.postId}>
          <span>{item.postName}</span>
          <LikePost postId={item.postId} isLiked={item.isLiked} likeCnt={item.likeCnt} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
