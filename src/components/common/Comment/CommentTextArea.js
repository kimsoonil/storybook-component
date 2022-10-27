/* eslint-disable */

import React from 'react';

import { Button } from 'components/idist/Button';

import 'assets/scss/club.scss';

function CommentTextArea(props) {
  return (
    <div className="relative">
      <div className="flex-center posts-container-comment-profile">
        <img
          src={
            props?.clubId?.data?.profile?.profile_image_url
              ? props?.clubId?.data?.profile.profile_image_url
              : require('images/main/temporary-profile.png')
          }
          alt=""
        />
        <div>{props?.clubId?.data?.profile?.user?.username}</div>
      </div>
      <textarea
        placeholder="Please leave a comment"
        value={props.replyValue.content || ''}
        onChange={(e) => props.ReplyInput(e.target.value)}
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
          <div onClick={() => props.ReplySecret()}>
            <img
              src={
                props.replyValue.is_secret
                  ? require('images/club/icon-comment-secret-active.png')
                  : require('images/club/icon-comment-secret.png')
              }
              alt=""
            />
          </div>
        </div>
        <div className="posts-container-comment-actions">
          <div className="textarea-count">{props.replyValue.content.length} / 2000 </div>
          {props.setEditComment !== undefined && (
            <div
              className="posts-cancel"
              onClick={() => {
                props.setEditComment(null);
              }}
            >
              Cancel
            </div>
          )}

          <Button
            size={'s'}
            label={'Post'}
            disabled={props.replyValue.length === 0}
            width={80}
            onClick={() => props.PostReply()}
          />
        </div>
      </div>
    </div>
  );
}

export default CommentTextArea;
