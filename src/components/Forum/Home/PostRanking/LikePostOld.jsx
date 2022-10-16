// import usePrevState from 'hook/usePrevState';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqLikePost } from 'redux/store/forum/likePostSlice';
import { setLikePost } from 'redux/store/forum/postRankingListSlice';

function LikePostOld({ postId, likeCnt, isLiked }) {
  const [subsInfo, setSubsInfo] = useState({});
  const { updateLikeCnt, isLoading } = useSelector((state) => ({
    isLoading: state.likePost.isLoading,
    updateLikeCnt: state.likePost.likeCnt
  }));
  const { id } = useSelector((state) => ({ ...state.logIn.user }));
  const dispatch = useDispatch();

  const onLikePost = useCallback((e) => {
    setSubsInfo({ postId: parseInt(e.target.id, 10) });
    dispatch(reqLikePost({ postId: parseInt(e.target.id, 10), userId: id }));
  }, []);

  useEffect(() => {
    if (subsInfo.postId && !isLoading) {
      dispatch(setLikePost({ postId: subsInfo.postId, likeCnt: updateLikeCnt }));
    }
  }, [subsInfo]);

  return (
    <span id={postId} style={{ backgroundColor: isLiked ? 'pink' : 'white' }} onClick={onLikePost} aria-hidden="true">
      ##Like:{likeCnt}##
    </span>
  );
}

export default React.memo(LikePostOld);
