import React from 'react';
import PostRankingList from './PostRankingList';
import PostSearch from './PostSearch';

function PostRanking() {
  return (
    <div style={{ border: '1px solid black' }}>
      <div>
        PostRanking
        <PostSearch />
      </div>
      <PostRankingList />
    </div>
  );
}

export default PostRanking;
