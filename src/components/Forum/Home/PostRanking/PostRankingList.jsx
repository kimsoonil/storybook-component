import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import loadable from '@loadable/component';
import SimplePost from './SimplePost';

const DetailPost = loadable(() => import('./DetailPost'));

function PostRankingList() {
  const { list } = useSelector((state) => ({ ...state.postRankingList }));
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    console.log(list);
  }, [list]);
  return (
    <div
      style={{
        width: '85vw',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
        gridGap: '20px'
      }}
    >
      {list?.map((item) => (
        <div
          style={{ height: '50px', padding: '12px', backgroundColor: 'white' }}
          key={item.postId}
          onMouseEnter={() => setPostId(item.postId)}
          onMouseLeave={() => setPostId(0)}
        >
          {postId === item.postId ? <DetailPost info={item} /> : <SimplePost item={item} />}
        </div>
      ))}
    </div>
  );
}

export default PostRankingList;
