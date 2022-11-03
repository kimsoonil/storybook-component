/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPostInit,
  getPostLikesInit,
  postPostLikeInit,
  postPostUnlikeInit,
  postPostDislikeInit,
  postPostUndislikeInit,
  postPostShareInit,
  postPostPinInit,
  postPostUnPinInit,
  deletePostInit
} from 'redux/idistStore/postsSlice';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router';

import { Loader } from 'components/idist/Loader';
import Profile from 'components/idist/Profile';
import SharePopup from 'components/idist/popup/SharePopup';
import ReportPopup from 'components/idist/popup/ReportPopup';
import SideMember from 'components/idist/Club/SideMember';
import SideEvent from 'components/idist/Club/SideEvent';

import HotPosts from 'components/idist/Club/HotPosts';
import PostContent from 'components/common/Post/PostContent';
import PostList from 'components/common/Post/PostList';
import PostRecent from 'components/common/Post/PostRecent';

import 'assets/scss/post.scss';
import 'assets/scss/main.scss';

function Posts(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const { post, like } = useSelector((state) => state.post);
  const { id, postId } = useParams();
  const clubId = useOutletContext();
  const [listState, setListState] = useState(false);
  const [disListState, setDisListState] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [openETC, setOpenETC] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  useEffect(() => {
    dispatch(getPostInit({ id: postId }));
    dispatch(getPostLikesInit({ id: postId }));
  }, [postId]);

  useEffect(() => {
    if (post?.data) {
      setListState(post?.data?.is_liked);
      setDisListState(post?.data?.is_dislike);
      setLikeCount(post?.data?.like_count);
      setDisLikeCount(post?.data?.dislike_count);
      localStorage.setItem('board', post.data.board_title);
      localStorage.setItem('boardGroup', post.data.board_group_title);
    }
  }, [post]);

  const handleClickPin = (pin) => {
    if (pin) {
      dispatch(
        postPostUnPinInit({
          id: postId,
          actionList: [
            { type: getPostInit.type, payload: { id: postId } },
            { type: getPostLikesInit.type, payload: { id: postId } }
          ]
        })
      );
    } else {
      dispatch(
        postPostPinInit({
          id: postId,
          actionList: [
            { type: getPostInit.type, payload: { id: postId } },
            { type: getPostLikesInit.type, payload: { id: postId } }
          ]
        })
      );
    }
  };
  const handleClickLike = () => {
    setListState(!listState);
    setDisListState(false);
    if (listState) {
      setLikeCount(likeCount - 1);
      dispatch(
        postPostUnlikeInit({
          id: postId,
          actionList: [
            { type: getPostInit.type, payload: { id: postId } },
            { type: getPostLikesInit.type, payload: { id: postId } }
          ]
        })
      );
    } else {
      setLikeCount(likeCount + 1);
      dispatch(
        postPostLikeInit({
          id: postId,
          actionList: [
            { type: getPostInit.type, payload: { id: postId } },
            { type: getPostLikesInit.type, payload: { id: postId } }
          ]
        })
      );
    }
  };
  const handleClickDisLike = (disLike) => {
    setDisListState(!disListState);
    setListState(false);
    if (disListState) {
      setDisLikeCount(disLikeCount - 1);
      dispatch(
        postPostUndislikeInit({
          id: postId,
          actionList: [
            { type: getPostInit.type, payload: { id: postId } },
            { type: getPostLikesInit.type, payload: { id: postId } }
          ]
        })
      );
    } else {
      setDisLikeCount(disLikeCount + 1);
      dispatch(
        postPostDislikeInit({
          id: postId,
          actionList: [
            { type: getPostInit.type, payload: { id: postId } },
            { type: getPostLikesInit.type, payload: { id: postId } }
          ]
        })
      );
    }
  };

  const handleClickShare = (link) => {
    dispatch(postPostShareInit({ id: id, parameters: { link: link } }));
  };
  const deletePost = (id, club, board) => {
    if (confirm('Are you sure you want to delete the post?')) {
      dispatch(deletePostInit({ id: id }));
      navigate(`/club/${club}/board/${board}`);
    }
  };
  const postNavigate = () => {
    navigate(`/club/${props.id}/board/${props.post.data.board}`);
  };
  if (post.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="posts container">
      <div className="item">
        <PostContent
          type="club"
          postNavigate={postNavigate}
          post={post}
          clubId={clubId}
          openETC={openETC}
          setOpenETC={setOpenETC}
          deletePost={deletePost}
          setReportOpen={setReportOpen}
          reportOpen={reportOpen}
          like={like}
          listState={listState}
          likeCount={likeCount}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          handleClickPin={handleClickPin}
          disListState={disListState}
          disLikeCount={disLikeCount}
          handleClickLike={handleClickLike}
          handleClickDisLike={handleClickDisLike}
        />
        <PostList type="club" prev={post?.data?.prev_post} next={post?.data?.next_post} post={post} id={id} />
        <PostRecent type="club" post={post} />
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data} type={'club'} /> : <Profile type={'logout'} />}
        <SideEvent />
        <HotPosts />
        <SideMember />
      </div>

      <SharePopup open={openPopup} setOpen={setOpenPopup} sharefuc={handleClickShare} />
      <ReportPopup open={reportOpen} setOpen={setReportOpen} />
    </div>
  );
}

export default Posts;
