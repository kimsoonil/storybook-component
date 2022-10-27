import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqForumList, reset } from 'redux/store/forum/forumListSlice';
import { useInView } from 'react-intersection-observer';
import Category from './Category';
import ForumSearch from './ForumSearch';
import ForumList from './ForumList';

function AllForum({ isShow, setIsShow }) {
  const [reqOption, setReqOption] = useState({ category: [], sort: 'week', forumId: '' });
  // const [hasNextPage, setHasNextPage] = useState(true);
  const { hasNextPage, forumList } = useSelector((state) => ({ ...state.forumList }));
  const [ref, inView] = useInView();
  const dispatch = useDispatch();

  // const moreData = () => {
  //   dispatch(reqForumList(reqOption));
  // };

  useEffect(() => {
    if (!isShow) dispatch(reset());
  }, [isShow]);

  useEffect(() => {
    if (inView && hasNextPage) {
      dispatch(reqForumList(reqOption));
    }
  }, [hasNextPage, inView]);

  return (
    <div style={{ position: 'relative', display: isShow ? 'inline-block' : 'none' }}>
      <div>
        AllForum
        <span style={{ marginLeft: '100px' }} onClick={() => setIsShow(false)} aria-hidden="true">
          X
        </span>
      </div>

      <Category reqOption={reqOption} setReqOption={setReqOption} />
      <ForumSearch reqOption={reqOption} setReqOption={setReqOption} />
      <ForumList list={forumList} />
      <div ref={ref} style={{ position: 'absolute', bottom: '100px', backgroundColor: 'grey', height: '30px' }} />
    </div>
  );
}

export default AllForum;
