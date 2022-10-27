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
  postCommentUndislikeInit,
  patchCommentInit,
  deleteCommentInit
} from 'redux/idistStore/commentSlice';
import { Loader } from 'components/idist/Loader';

import 'assets/scss/club.scss';
import CommentTextArea from './CommentTextArea';
import CommentList from './CommentList';

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
  const [selectComment, setSelectComment] = useState(null);
  const [editComment, setEditComment] = useState(null);
  const [editValue, setEditValue] = useState({
    content: '',
    is_secret: false
  });
  const [replyValue, setReplyValue] = useState({
    parent_comment: null,
    content: '',
    is_secret: false
  });

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
  const ReplyOpen = (value) => {
    setReplyValue({ ...replyValue, parent_comment: value, content: '', is_secret: false });
  };
  const ReplyInput = (value) => {
    setReplyValue({ ...replyValue, content: value });
  };
  const ReplySecret = () => {
    setReplyValue({ ...replyValue, is_secret: !replyValue.is_secret });
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
  const PostReply = () => {
    console.log('replyValue', replyValue);
    dispatch(
      postPostCommentInit({
        id: postId,
        parameters: replyValue,
        actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
      })
    );

    setReplyValue({ ...replyValue, parent_comment: null, content: '', is_secret: false });
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
  const deleteComment = (id) => {
    if (confirm('Are you sure you want to delete the post?')) {
      dispatch(
        deleteCommentInit({ id: id, actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }] })
      );
    }
  };
  const EditCommentSecret = () => {
    setEditValue({ ...editValue, is_secret: !editValue.is_secret });
  };
  const EditCommenInput = (value) => {
    setEditValue({ ...editValue, content: value });
  };
  const PatchEditComment = () => {
    dispatch(
      patchCommentInit({
        id: selectComment,
        parameters: editValue,
        actionList: [{ type: getPostCommentsInit.type, payload: { id: postId } }]
      })
    );
    setEditComment(null);
    setCommentValue({ ...editValue, content: '', is_secret: false });
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
      <CommentTextArea
        replyValue={commentValue}
        PostReply={PostComment}
        ReplySecret={CommentSecret}
        ReplyInput={CommenInput}
        clubId={clubId}
      />
      <div className="comment">
        {comment.message !== 'ok' ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : (
          comment.data.map((commentItem, index) => {
            return (
              <CommentList
                deleteComment={deleteComment}
                commentItem={commentItem}
                clickCommentLike={clickCommentLike}
                clickCommentDisLike={clickCommentDisLike}
                ReplyOpen={ReplyOpen}
                replyValue={replyValue}
                PostReply={PostReply}
                ReplySecret={ReplySecret}
                ReplyInput={ReplyInput}
                clubId={clubId}
                PatchEditComment={PatchEditComment}
                EditCommentSecret={EditCommentSecret}
                EditCommenInput={EditCommenInput}
                setEditValue={setEditValue}
                editValue={editValue}
                setSelectComment={setSelectComment}
                editComment={editComment}
                setEditComment={setEditComment}
                key={index}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

export default Comment;
