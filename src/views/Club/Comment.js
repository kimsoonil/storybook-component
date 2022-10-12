/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router';
import { postPostCommentInit, getPostCommentsInit } from 'redux/idistStore/postsSlice';
import {
  postCommentLikeInit,
  postCommentUnlikeInit,
  postCommentDislikeInit,
  postCommentUndislikeInit
} from 'redux/idistStore/commentSlice';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';
import { dateCalculation } from 'utils/dateCalculation';


import 'assets/scss/club.scss';

function Comment(props) {
  const dispatch = useDispatch();
  const { comment } = useSelector((state) => state.post);
  const { id, postId } = useParams();
  const [commentValue, setCommentValue] = useState({
    parent_comment: null,
    content: '',
    is_secret: false
  });
  const clubId = useOutletContext();
  const [listState, setListState] = useState(null);
  const [disListState, setDisListState] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [disLikeCount, setDisLikeCount] = useState(0);

  useEffect(() => {
    dispatch(getPostCommentsInit({ id: postId }));
  }, []);

  useEffect(() => {
    if (comment.data) {
      setLikeCount(comment?.data[0]?.like_count);
      setDisLikeCount(comment?.data[0]?.dislike_count);
    }
  }, [comment.data]);

  const CommenInput = (value) => {
    setCommentValue({ ...commentValue, content: value });
  };
  const CommentSecret = () => {
    setCommentValue({ ...commentValue, is_secret: !commentValue.is_secret });
  };
  const PostComment = () => {
    dispatch(
      postPostCommentInit({
        id: postId,
        parameters: commentValue,
        actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
      })
    );

    setCommentValue({ ...commentValue, parent_comment: null, content: '', is_secret: false });
  };
  const clickCommentLike = (id) => {
    setListState(id);
    setDisListState(null);
    if (listState === id) {
      setLikeCount(likeCount - 1);
      setListState(null);
      dispatch(
        postCommentUnlikeInit({
          id: id,
          actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
        })
      );
    } else {
      setLikeCount(likeCount + 1);
      dispatch(
        postCommentLikeInit({
          id: id,
          actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
        })
      );
    }
  };
  const clickCommentDisLike = (id) => {
    setDisListState(id);
    setListState(null);

    if (disListState === id) {
      setDisLikeCount(disLikeCount - 1);
      setDisListState(null);
      dispatch(
        postCommentUndislikeInit({
          id: id,
          actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
        })
      );
    } else {
      setDisLikeCount(disLikeCount + 1);
      dispatch(
        postCommentDislikeInit({
          id: id,
          actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
        })
      );
    }
  };
  return (
    <div className="posts-container-comment ">
      <div className="flex-between">
        <div className="posts-container-comment-count flex-center">
          <img src={require('images/club/messaging.png')} alt="" />
          Comments {comment?.data?.length}
        </div>
        <div className="posts-container-comment-filter">
          <div className="comment-list-filter flex-center">
            <div className="flex-center active">Recent</div>
            <div className="flex-center">Popular</div>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="flex-center posts-container-comment-profile">
          <img
            src={
              clubId.data.profile.user.profile_image_url
                ? clubId.data.profile.user.profile_image_url
                : require('images/main/temporary-profile.png')
            }
            alt=""
          />
          <div>{clubId.data.profile.user.username}</div>
        </div>
        <textarea
          placeholder="Please leave a comment"
          value={commentValue.content || ''}
          onChange={(e) => CommenInput(e.target.value)}
          maxLength={2000}
        />
        <div className="flex-between posts-container-comment-bottom">
          <div className="flex-center posts-container-comment-icon">
            <div>
              <img src={require('images/club/icon-comment1.png')} alt="" />
            </div>
            <div>
              <img src={require('images/club/icon-comment2.png')} alt="" />
            </div>
            <div>
              <img src={require('images/club/icon-comment3.png')} alt="" />
            </div>
            <div onClick={() => CommentSecret()}>
              <img
                src={
                  commentValue.is_secret
                    ? require('images/club/icon-comment-secret-active.png')
                    : require('images/club/icon-comment-secret.png')
                }
                alt=""
              />
            </div>
          </div>
          <div className="posts-container-comment-actions">
            <div className="textarea-count">{commentValue.content.length} / 2000 </div>
            <Button
              size={'s'}
              label={'Post'}
              disabled={commentValue.length === 0}
              width={80}
              onClick={() => PostComment()}
            />
          </div>
        </div>
      </div>
      <div className="comment">
        {comment.message !== 'ok' ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : (
          comment.data.map((commentItem, index) => {
            return (
              <div className="comment-list" key={index}>
                <img
                  className="comment-list-img"
                  src={
                    commentItem?.profile?.user?.profile_image_url
                      ? commentItem?.profile?.user?.profile_image_url
                      : require('images/main/temporary-profile.png')
                  }
                  alt=""
                />
                <div className="comment-list-item">
                  <div className="flex-between">
                    <div className="comment-list-item-icon">
                      <div className="comment-list-item-title">{commentItem.profile?.user.username}</div>

                      {commentItem.profile?.staff_name === null ? (
                        <>
                          <div className="profile-rating flex-center">{commentItem.profile?.grade_name}</div>
                          <div className="profile-level">LV {commentItem.profile?.level}</div>
                        </>
                      ) : (
                        <div className="profile-staff flex-center">{commentItem.profile?.staff_name}</div>
                      )}
                    </div>
                    <div>
                      <img src={require('images/club/etc.png')} />
                    </div>
                  </div>
                  <div className="comment-list-content">
                    {commentItem.content}
                    {commentItem.is_secret ? <img src={require('images/club/icon-comment-secret.png')} /> : <></>}
                  </div>
                  <div className="flex-between">
                    <div className="comment-list-item-icon">
                      <div className="profile-age">
                        {dateCalculation(commentItem?.created)} <span className="reply">reply</span>
                      </div>
                    </div>
                    <div className="flex-center icon-like-group">
                      <div
                        className={'btn-like flex-center ' + (commentItem.is_like && 'active')}
                        onClick={() => clickCommentLike(commentItem?.id)}
                      >
                        <img src={require('images/club/like.png')} alt="" />
                        {commentItem.like_count}
                        
                      </div>
                      <div
                        className={'btn-unlike flex-center ' + (commentItem.is_dislike && 'active')}
                        onClick={() => clickCommentDisLike(commentItem?.id)}
                      >
                        <img src={require('images/club/unlike.png')} alt="" />

                        {commentItem.dislike_count}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Comment;
