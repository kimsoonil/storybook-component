import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { reqForumList } from 'redux/store/forum/forumListSlice';

function ForumSearch({ reqOption, setReqOption }) {
  const menu = [
    { id: 'sorting', txt: 'ABC' },
    { id: 'live', txt: 'live Ranking' },
    { id: 'weekly', txt: 'weekly Ranking' },
    { id: 'new', txt: 'New' },
    { id: 'rising', txt: 'Rising' }
  ];
  const [forumId, setForumId] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    setReqOption({ ...reqOption, forumId });
  }, [forumId]);

  return (
    <>
      {menu.map((item) => (
        <button key={item.id} id={item.id} onClick={(e) => setReqOption({ ...reqOption, sort: e.target.id })}>
          {item.txt}
        </button>
      ))}
      <input onChange={(e) => setForumId(e.target.value)} />
      <button type="button" onClick={() => dispatch(reqForumList(reqOption))}>
        Go
      </button>
    </>
  );
}

export default ForumSearch;
