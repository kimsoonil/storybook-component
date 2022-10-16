/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import BoardAlbum from 'components/idist/Club/BoardAlbum';
import BoardList from 'components/idist/Club/BoardList';
import BoardCard from 'components/idist/Club/BoardCard';
import { Fliter } from 'components/idist/Fliter';
import ToggleBtn from 'components/idist/ToggleBtn';

function MemberProfileContent(props) {
  const [postsState, setPostsState] = useState('LIST_TYPE');
  const [openFilter, setOpenFilter] = useState(false);
  console.log('props.profile', props.profile);
  return (
    <div className="club-home-content">
      <div className="member-profile">
        <div>
          <img
            src={
              props.profile.data.user.profile_image_url
                ? props.profile.data.user.profile_image_url
                : require('images/club/member.jpeg')
            }
          />
        </div>
        <div className="member-profile-content">
          <div className="member-profile-name">{props.profile.data.user.username}</div>

          <div className="member-profile-info">
            <div className="profile-rating flex-center">{props.profile.data.grade_title}</div>
            <div className="profile-level flex-center">LV {props.profile.data.level}</div>
          </div>
          <div className="member-profile-counter ">
            <div className="member-profile-counter-info flex-center">
              <div className="member-profile-counter-info-title">Visit</div>
              <div className="member-profile-counter-info-content">{props.profile.data.visit_count}</div>
            </div>
            <div className="member-profile-counter-info flex-center">
              <div className="member-profile-counter-info-title">Posts</div>
              <div className="member-profile-counter-info-content">{props.profile.data.post_count}</div>
            </div>
            <div className="member-profile-counter-info flex-center">
              <div className="member-profile-counter-info-title">Comments</div>
              <div className="member-profile-counter-info-content">{props.profile.data.comment_count}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="member-profile-tap">
        <div
          className={'item ' + (props.postListState === 'post' && 'active')}
          onClick={() => props.setPostListState('post')}
        >
          Post
        </div>
        <div
          className={'item ' + (props.postListState === 'comment' && 'active')}
          onClick={() => props.setPostListState('comment')}
        >
          Comment
        </div>
        <div
          className={'item ' + (props.postListState === 'like' && 'active')}
          onClick={() => props.setPostListState('like')}
        >
          Like
        </div>
        <div
          className={'item ' + (props.postListState === 'draft' && 'active')}
          onClick={() => props.setPostListState('draft')}
        >
          draft
        </div>
      </div>
      <div className="flex-between">
        <div className="club-list-tag">
          <div className="comment-list-filter flex-center">
            <div className="flex-center active">New</div>
            <div className="flex-center">Popular</div>
          </div>
        </div>
        <div className="flex-center">
          <div className="feed">
            My feed
            <ToggleBtn id={'myFeed'} />
          </div>
          <div className="fliter-icon relative">
            <div onClick={() => setOpenFilter(!openFilter)}>
              <img src={require(`images/club/icon-fliter.png`)} alt="" />
            </div>
            <div className="fliter-position" style={{ display: openFilter ? 'flex' : 'none' }}>
              <Fliter doneFuc={() => setOpenFilter(!openFilter)} />
            </div>
          </div>
          <div className="board-state">
            <div
              className={'album ' + (postsState === 'ALBUM_TYPE' && 'active')}
              onClick={() => {
                setPostsState('ALBUM_TYPE');
              }}
            ></div>
            <div
              className={'list ' + (postsState === 'LIST_TYPE' && 'active')}
              onClick={() => {
                setPostsState('LIST_TYPE');
              }}
            ></div>
            <div
              className={'card ' + (postsState === 'CARD_TYPE' && 'active')}
              onClick={() => {
                setPostsState('CARD_TYPE');
              }}
            ></div>
          </div>
        </div>
      </div>

      {postsState === 'ALBUM_TYPE' && <BoardAlbum DataList={props.postsList} posts={props.posts} />}
      {postsState === 'LIST_TYPE' && <BoardList DataList={props.postsList} posts={props.posts} />}
      {postsState === 'CARD_TYPE' && <BoardCard DataList={props.postsList} posts={props.posts} />}
    </div>
  );
}

export default MemberProfileContent;
