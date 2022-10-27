import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import SimplePost from './SimplePost';

function PostRankingList2() {
  const { list } = useSelector((state) => ({ ...state.postRankingList }));

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <ul className="ranking_list">
      {list?.map((item) => (
        <SimplePost item={item} key={item.id} />
      ))}
    </ul>
  );
}

export default PostRankingList2;
