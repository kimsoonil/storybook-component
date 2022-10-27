/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardInit, getBoardPostsInit, getMoreBoardPostsInit } from 'redux/idistStore/boardSlice';
import { useParams } from 'react-router';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import Profile from 'components/idist/Profile';
import HotPosts from 'components/idist/Club/HotPosts';
import BoardContent from './BoardContent';
import SideMember from 'components/idist/Club/SideMember';
import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';

function Board(props) {
  const [postsState, setPostsState] = useState('LIST_TYPE');
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { board, posts, postsList } = useSelector((state) => state.board);
  const { id, boardId } = useParams();
  const clubId = useOutletContext();
  const search = searchParams.get('search');
  const [isBottom, setIsBottom] = useState(false);
  const parameters = {
    search: search,
    page_size: 20
  };

  useEffect(() => {
    if (searchParams.get('search') !== null) {
      parameter.search = searchParams.get('search');
    }
    dispatch(getBoardPostsInit({ id: boardId, parameters: parameters }));
    dispatch(getBoardInit({ id: boardId }));
  }, [boardId]);

  useEffect(() => {
    setPostsState(board?.data?.view_mode);
  }, [board]);

  useEffect(() => {
    if (isBottom) {
      dispatch(getMoreBoardPostsInit({ id: boardId, parameters: parameters }));

      setIsBottom(false);
    }
  }, [isBottom, postsList, dispatch, setIsBottom]);

  function handleUserScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  useEffect(() => {
    if (posts.count === postsList.length) {
      return () => window.removeEventListener('scroll', handleUserScroll);
    }
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  });

  if (posts.message !== 'ok' && board.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="club-home container">
      <div className="item">
        <BoardContent
          board={board}
          postsState={postsState}
          setPostsState={setPostsState}
          posts={posts}
          postsList={postsList}
        />
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}
        <div>
          <HotPosts />
        </div>
        <SideMember />
      </div>
    </div>
  );
}

export default Board;
