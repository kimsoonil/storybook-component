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
import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router';

import { Loader } from 'components/idist/Loader';

import SharePopup from 'components/idist/popup/SharePopup';
import ReportPopup from 'components/idist/popup/ReportPopup';

import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';

import PostContent from 'components/common/Post/PostContent';
import PostList from 'components/common/Post/PostList';
import PostRecent from 'components/common/Post/PostRecent';

import 'assets/scss/post.scss';
import 'assets/scss/main.scss';

function Posts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const { post, like } = useSelector((state) => state.post);
  const { forumIdPostList } = useSelector((state) => state.forumIdPostList);
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
    if (id) dispatch(reqForumIdPostList({ forumId: id }));
  }, [id]);
  useEffect(() => {
    if (post?.data) {
      setListState(post?.data?.is_liked);
      setDisListState(post?.data?.is_disliked);
      setLikeCount(post?.data?.like_count);
      setDisLikeCount(post?.data?.dislike_count);
      localStorage.setItem('board', post.data.board_title);
      localStorage.setItem('boardGroup', post.data.board_group_title);
    }
  }, [post]);
  console.log('post', post);
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
      navigate(`/forum/1/theme`);
    }
  };
  const postNavigate = () => {
    navigate(`/forum/${id}`);
  };

  if (post.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div>
      <Header />
      <div className="main">
        <div className="posts container">
          <div className="item">
            <PostContent
              type="forum"
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
            <PostList
              type="forum"
              prev={post?.data?.prev_post}
              next={post?.data?.next_post}
              post={forumIdPostList}
              id={id}
            />
            <PostRecent type="forum" post={forumIdPostList} id={id} />
          </div>
          {/* 사이드바 */}
          <div className="item">
            {/* {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}
        <SideEvent id={id} />
        <HotPosts />
        <SideMember /> */}
            {/* <div className="chatting">
              <img src={require(`images/main/chatting.png`)} alt="" />
            </div> */}
          </div>

          <SharePopup open={openPopup} setOpen={setOpenPopup} sharefuc={handleClickShare} />
          <ReportPopup open={reportOpen} setOpen={setReportOpen} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Posts;
