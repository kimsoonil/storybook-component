import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Subscribe from './Subscribe';

function ForumList() {
  const { list } = useSelector((state) => ({ ...state.forumList }));

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div>
      {list?.map((item) => (
        <div style={{ height: '50px' }} key={item.forumId}>
          <Subscribe forumId={item.forumId} status={item.subsStatus} />
          <span>{item.img}</span>
          <span>{item.postsCnt}</span>
          <span>{item.commentCnt}</span>
          <span>{item.contents}</span>
        </div>
      ))}
    </div>
  );
}

export default ForumList;
