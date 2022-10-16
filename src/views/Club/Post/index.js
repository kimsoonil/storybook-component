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
import { boardReset } from 'redux/idistStore/boardSlice';
import { useOutletContext } from 'react-router-dom';
import { dateCalculation } from 'utils/dateCalculation';
import { useParams } from 'react-router';
import { Loader } from 'components/idist/Loader';
import Comment from './Comment';
import PostConent from './PostConent';
import Profile from 'components/idist/Profile';
import SharePopup from 'components/idist/popup/SharePopup';
import 'assets/scss/club.scss';
import 'assets/scss/main.scss';
import SideMember from 'components/idist/Club/SideMember';

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

  useEffect(() => {
    dispatch(boardReset());
    dispatch(getPostInit({ id: postId }));
    dispatch(getPostLikesInit({ id: postId }));
  }, [postId]);

  useEffect(() => {
    if (post?.data) {
      setListState(post?.data?.is_like);
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
  if (post.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="posts container" style={{ marginTop: '20px' }}>
      <div className="item">
        <div className="club-home-content home-box">
          <div className="posts-container">
            <div className="flex-between posts-container-header">
              <div>
                <div className="posts-container-nav" onClick={() => navigate(`/club/${id}/board/${post.data.board}`)}>
                  {post.data.board_group_title} &gt; {post.data.board_title}
                </div>
                <div className="posts-container-title">
                  {post.data.title} {post.data.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
                </div>
                <div className="posts-container-profile">
                  <div>
                    <img
                      src={
                        post.data.profile_image_url
                          ? post.data.profile_image_url
                          : require('images/main/temporary-profile.png')
                      }
                      alt=""
                    />
                  </div>
                  <div className="posts-container-profile-info">
                    <div className="posts-container-profile-info-tag">
                      <div>{post.data.profile.user.username}</div>

                      {post.data?.profile?.staff_title === null ? (
                        <>
                          <div className="profile-rating flex-center">{post.data?.profile?.grade_title}</div>
                          <div className="profile-level">LV {post.data?.profile?.level}</div>
                        </>
                      ) : (
                        <div className="profile-staff flex-center">{post.data?.profile?.staff_title}</div>
                      )}
                    </div>
                    <div>
                      <div className="profile-age">{dateCalculation(post.data.created)}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-center">
                <div>
                  <div className="flex-center posts-header-btn">
                    <div className="item flex-center" onClick={() => setOpenPopup(!openPopup)}>
                      <img src={require(`images/club/rank.png`)} alt="" />
                    </div>
                    <div className="item flex-center" onClick={() => handleClickPin(post.data.is_pin)}>
                      <img
                        src={require(post.data.is_pin
                          ? post.data.is_pin
                            ? `images/club/club-bookmark.png`
                            : `images/club/icon-bookmark-line.png`
                          : `images/club/icon-bookmark-line.png`)}
                        alt=""
                      />
                    </div>
                    <div className="item etc relative">
                      <img src={require('images/club/etc.png')} onClick={() => setOpenETC(!openETC)} />
                      <div className="etc-box" style={{ display: openETC ? 'block' : 'none' }}>
                        <div onClick={() => navigate(`../writing/${post.data.id}`)}>Edit</div>
                        <div onClick={() => deletePost(post.data.id, post.data.club, post.data.board)}>Delete</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="posts-container-body">
              <div className="" dangerouslySetInnerHTML={{ __html: post.data.content }}></div>
            </div>
            <div className="posts-tag">
              {post.data.tags.map((tagItem, index) => {
                return (
                  <div className="posts-tag-item" key={index}>
                    # {tagItem.name}
                  </div>
                );
              })}
            </div>
            <div className="posts-container-footer">
              <div className="posts-container-like flex-between">
                {like.message === 'ok' ? (
                  like.data.length > 0 ? (
                    like.data.length === 1 ? (
                      <div className="posts-container-avatar">
                        <img
                          src={
                            like.data[0].profile_data.user.profile_image_url
                              ? like.data[0].profile_data.user.profile_image_url
                              : require('images/main/temporary-profile.png')
                          }
                          alt=""
                        />
                        {like.data[0].profile_data.user.username}
                      </div>
                    ) : (
                      <div className="posts-container-avatar relative">
                        {like.data.map((likeItem, index) => {
                          if (index < 3)
                            return (
                              <div key={index} className="mul-img" style={{ left: index * 18 + 'px' }}>
                                <img
                                  src={
                                    likeItem.profile_data.user?.profile_image_url
                                      ? likeItem.profile_data.user?.profile_image_url
                                      : require('images/main/temporary-profile.png')
                                  }
                                  alt=""
                                />
                              </div>
                            );
                        })}
                        <div style={{ marginLeft: 15 * (like.data.length < 3 ? like.data.length : 3) }}>
                          {like.data[like.data.length - 1].profile_data?.user?.username} and {like.data.length - 1}{' '}
                          others like it
                        </div>
                      </div>
                    )
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div className="flex-center">
                    <Loader />
                  </div>
                )}

                <div className="flex-center icon-like-group">
                  <div className={'btn-like flex-center ' + (listState && 'active')} onClick={() => handleClickLike()}>
                    <img src={require('images/club/like.png')} alt="" />
                    {likeCount}
                    {/* {post.data.like_count} */}
                  </div>
                  <div
                    className={'btn-unlike flex-center ' + (disListState && 'active')}
                    onClick={() => handleClickDisLike()}
                  >
                    <img src={require('images/club/unlike.png')} alt="" />
                    {/* {post.data.dislike_count} */}
                    {disLikeCount}
                  </div>
                </div>
              </div>
              <Comment />
            </div>
          </div>
          <PostConent post={post} />
        </div>
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}
        <SideMember />
      </div>
      <SharePopup open={openPopup} setOpen={setOpenPopup} sharefuc={handleClickShare} />
    </div>
  );
}

export default Posts;
