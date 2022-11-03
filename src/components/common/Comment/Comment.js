/* eslint-disable */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { useParams } from 'react-router';
import { getUserInit } from 'redux/idistStore/userSlice';
import { postPostCommentInit, getPostCommentsInit, getMoreCommentInit } from 'redux/idistStore/postsSlice';
import {
  postCommentLikeInit,
  postCommentUnlikeInit,
  postCommentDislikeInit,
  postCommentUndislikeInit,
  patchCommentInit,
  deleteCommentInit
} from 'redux/idistStore/commentSlice';
import { Loader } from 'components/idist/Loader';
import { Button } from 'components/idist/Button';
import 'assets/scss/club.scss';
import CommentTextArea from './CommentTextArea';
import CommentList from './CommentList';

function Comment(props) {
  const dispatch = useDispatch();
  const { comment, commentList } = useSelector((state) => state.post);
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
  const { user } = useSelector((state) => state.user);
  const parameters = { page_size: 20 };
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
    dispatch(getPostCommentsInit({ id: postId, parameters: parameters }));
    dispatch(getUserInit());
  }, [postId]);
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

  const commentMoreList = () => {
    console.log('parameters', parameters);
    dispatch(getMoreCommentInit({ id: postId, parameters: parameters }));
  };
  return (
    <div className="posts-container-comment ">
      <div className="flex-between">
        <div className="posts-container-comment-count flex-center">
          <img src={require('images/club/messaging.png')} alt="" />
          Comments {comment?.count}
        </div>
        {/* <div className="posts-container-comment-filter">
          <div className="comment-list-filter flex-center">
            <div className="flex-center active">Recent</div>
            <div className="flex-center">Popular</div>
          </div>
        </div> */}
      </div>
      {user.message !== 'ok' ? (
        <div className="flex-center">
          <Loader />
        </div>
      ) : (
        <CommentTextArea
          replyValue={commentValue}
          PostReply={PostComment}
          ReplySecret={CommentSecret}
          ReplyInput={CommenInput}
          clubId={clubId}
          user={user}
        />
      )}
      <div className="comment">
        {comment.message !== 'ok' && user.message !== 'ok' ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : (
          commentList.map((commentItem, index) => {
            return (
              <>
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
                  user={user.data}
                />
              </>
            );
          })
        )}
      </div>
      {comment.count === commentList.length || commentList.length <= 0 ? (
        <div></div>
      ) : (
        <div className="flex-center" style={{ marginTop: '20px' }}>
          <Button label="More" size="s" width={90} onClick={() => commentMoreList()} />
        </div>
      )}
    </div>
  );
}

export default Comment;
