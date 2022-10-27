/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { dateCalculation } from 'utils/dateCalculation';
import { patchCommentInit } from 'redux/idistStore/commentSlice';
import 'assets/scss/club.scss';
import CommentTextArea from './CommentTextArea';

function Comment(props) {
  const [openETC, setOpenETC] = useState(null);

  const EditCommentOpen = (id) => {
    setOpenETC(null);
    props.setEditComment(id);
    props.setEditValue({
      content: props.commentItem.content,
      is_secret: props.commentItem.is_secret
    });
    props.setSelectComment(props.commentItem.id);
  };

  return (
    <div className="comment-list">
      {props.editComment === props.commentItem.id ? (
        <div style={{ width: '100%' }}>
          <CommentTextArea
            replyValue={props.editValue}
            PostReply={props.PatchEditComment}
            ReplySecret={props.EditCommentSecret}
            ReplyInput={props.EditCommenInput}
            clubId={props.clubId}
            setEditComment={props.setEditComment}
          />
        </div>
      ) : (
        <>
          <img
            className="comment-list-img"
            src={
              props.commentItem?.profile?.user?.profile_image_url
                ? props.commentItem?.profile?.user?.profile_image_url
                : require('images/main/temporary-profile.png')
            }
            alt=""
          />
          <div className="comment-list-item">
            <div className="flex-between">
              <div className="comment-list-item-icon">
                <div className="comment-list-item-title">{props.commentItem.profile?.user?.username}</div>

                {props.commentItem.profile?.staff_title === null ? (
                  <>
                    <div className="profile-rating flex-center">{props.commentItem.profile?.grade_title}</div>
                    <div className="profile-level">LV {props.commentItem.profile?.level}</div>
                  </>
                ) : (
                  <div className="profile-staff flex-center">{props.commentItem.profile?.staff_title}</div>
                )}
              </div>
              <div className="etc">
                <div className="etc-img" onClick={() => setOpenETC(props.commentItem.id)} />

                <div className="etc-box" style={{ display: openETC === props.commentItem.id ? 'block' : 'none' }}>
                  <div onClick={() => EditCommentOpen(props.commentItem.id)}>Edit</div>
                  <div onClick={() => props.deleteComment(props.commentItem.id)}>Delete</div>
                </div>
              </div>
            </div>
            <div className="comment-list-content">
              {props.commentItem.content}
              {props.commentItem.is_secret ? <img src={require('images/club/icon-comment-secret.png')} /> : <></>}
            </div>
            <div className="flex-between">
              <div className="comment-list-item-icon">
                <div className="profile-age">
                  {dateCalculation(props.commentItem?.created)}
                  <span className="reply" onClick={() => props.ReplyOpen(props.commentItem.id)}>
                    reply
                  </span>
                </div>
              </div>
              <div className="flex-center icon-like-group">
                <div
                  className={'btn-like flex-center ' + (props.commentItem.is_liked && 'active')}
                  onClick={() => props.clickCommentLike(props.commentItem?.id)}
                >
                  <img src={require('images/club/like.png')} alt="" />
                  {props.commentItem.like_count}
                </div>
                <div
                  className={'btn-unlike flex-center ' + (props.commentItem.is_disliked && 'active')}
                  onClick={() => props.clickCommentDisLike(props.commentItem?.id)}
                >
                  <img src={require('images/club/unlike.png')} alt="" />

                  {props.commentItem.dislike_count}
                </div>
              </div>
            </div>
            {props.replyValue.parent_comment === props.commentItem.id && (
              <CommentTextArea
                replyValue={props.replyValue}
                PostReply={props.PostReply}
                ReplySecret={props.ReplySecret}
                ReplyInput={props.ReplyInput}
                clubId={props.clubId}
              />
            )}

            {props.commentItem?.child_comment instanceof Array &&
              props.commentItem?.child_comment?.map((childItem, index) => {
                return (
                  <div className="comment-list child-comment" key={index}>
                    <img
                      className="comment-list-img"
                      src={
                        childItem?.profile?.user?.profile_image_url
                          ? childItem?.profile?.user?.profile_image_url
                          : require('images/main/temporary-profile.png')
                      }
                      alt=""
                    />
                    <div className="comment-list-item">
                      <div className="flex-between">
                        <div className="comment-list-item-icon">
                          <div className="comment-list-item-title">{childItem.profile?.user?.username}</div>

                          {childItem.profile?.staff_title === null ? (
                            <>
                              <div className="profile-rating flex-center">{childItem.profile?.grade_title}</div>
                              <div className="profile-level">LV {childItem.profile?.level}</div>
                            </>
                          ) : (
                            <div className="profile-staff flex-center">{childItem.profile?.staff_title}</div>
                          )}
                        </div>
                        <div>
                          <div className="etc-img" onClick={() => setOpenETC(props.commentItem.id)} />
                        </div>
                      </div>
                      <div className="comment-list-content">
                        {childItem.content}
                        {childItem.is_secret ? <img src={require('images/club/icon-comment-secret.png')} /> : <></>}
                      </div>
                      <div className="flex-between">
                        <div className="comment-list-item-icon">
                          <div className="profile-age">{dateCalculation(childItem?.created)}</div>
                        </div>
                        <div className="flex-center icon-like-group">
                          <div
                            className={'btn-like flex-center ' + (childItem.is_liked && 'active')}
                            onClick={() => props.clickCommentLike(childItem?.id)}
                          >
                            <img src={require('images/club/like.png')} alt="" />
                            {childItem.like_count}
                          </div>
                          <div
                            className={'btn-unlike flex-center ' + (childItem.is_disliked && 'active')}
                            onClick={() => props.clickCommentDisLike(childItem?.id)}
                          >
                            <img src={require('images/club/unlike.png')} alt="" />

                            {childItem.dislike_count}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
}

export default Comment;
