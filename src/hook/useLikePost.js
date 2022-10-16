import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqLikePost } from 'redux/store/forum/likePostSlice';
// import { setLikePost } from 'redux/store/forum/postRankingListSlice';

const useLikePost = (setLikeCnt) => {
  const [postInfo, setPostInfo] = useState({});
  const { updateLikeCnt, isLoading } = useSelector((state) => ({
    isLoading: state.likePost.isLoading,
    updateLikeCnt: state.likePost.likeCnt
  }));
  const { id } = useSelector((state) => ({ ...state.logIn.user }));
  const dispatch = useDispatch();

  const onLikePost = useCallback((e) => {
    setPostInfo({ postId: parseInt(e.target.id, 10) });
    dispatch(reqLikePost({ postId: parseInt(e.target.id, 10), userId: id }));
  }, []);

  const onUpdateLikeCnt = useCallback(() => {
    dispatch(setLikeCnt({ postId: postInfo.postId, likeCnt: updateLikeCnt }));
  }, [postInfo]);

  useEffect(() => {
    if (postInfo.postId && !isLoading) {
      onUpdateLikeCnt();
    }
  }, [postInfo]);
  return [onLikePost];
};

export default useLikePost;
