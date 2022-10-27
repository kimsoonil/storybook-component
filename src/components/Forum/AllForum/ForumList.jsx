import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Subscribe from './Subscribe';

function ForumList() {
  const { forumList } = useSelector((state) => ({ ...state.forumList }));

  useEffect(() => {
    console.log(forumList);
  }, [forumList]);
  return (
    <div>
      {forumList?.map((item) => (
        <div style={{ height: '50px' }} key={item.title}>
          <Subscribe forumId={item.id} status={item.subsStatus} />
          <span>{item.thumbnail_image_url}</span>
          <span>{item.postsCnt}</span>
          <span>{item.commentCnt}</span>
          <span>{item.contents}</span>
        </div>
      ))}
    </div>
  );
}

export default ForumList;
