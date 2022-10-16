import React from 'react';
import { useDispatch } from 'react-redux';
import { reqlatestPosts } from 'redux/store/forum/latestPostsSlice';

function ForumDetail({ info }) {
  const dispatch = useDispatch();
  const onLoadPostList = () => {
    dispatch(reqlatestPosts({ forumId: info.forumId }));
  };

  return (
    <div style={{ border: '1px solid black', marginTop: '20px' }} onClick={onLoadPostList} aria-hidden="true">
      <div>
        <img src={info.img} alt={info.forumName} />
      </div>
      <div>
        <span>{info.category}</span>
        <span>{info.forumName}</span>
      </div>
      <div>
        <span>{info.forumComment}</span>
      </div>
    </div>
  );
}

export default ForumDetail;
