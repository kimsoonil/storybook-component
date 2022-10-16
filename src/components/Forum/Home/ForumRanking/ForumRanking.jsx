import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqForumRankingList } from 'redux/store/forum/forumRankingListSlice';
import RankingSlide from './RankingSlide';
import ForumDetail from './ForumDetail';
import PostList from './PostList';

function ForumRanking() {
  const menu = [
    { id: 'live', txt: 'Live' },
    { id: 'week', txt: 'Weekly' },
    { id: 'mon', txt: 'Monthly' }
  ];
  const [reqOption, setReqOption] = useState({ sort: 'live' });
  const { list } = useSelector((state) => ({ ...state.forumRankingList }));

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(reqOption);
    dispatch(reqForumRankingList(reqOption));
  }, [reqOption]);

  return (
    <>
      <span style={{ marginLeft: '10px' }}>
        {menu.map((item) => (
          <button
            style={{ backgroundColor: item.id === reqOption.sort ? 'red' : 'white', marginLeft: '10px' }}
            key={item.id}
            id={item.id}
            onClick={(e) => setReqOption({ ...reqOption, sort: e.target.id })}
          >
            {item.txt}
          </button>
        ))}
      </span>
      <RankingSlide>
        {list.map((item) => (
          <ForumDetail info={item} key={item.forumId} />
        ))}
      </RankingSlide>
      <PostList />
    </>
  );
}

export default ForumRanking;
