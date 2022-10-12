/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { getProfileInit } from 'redux/idistStore/profileSlice';
import Profile from 'components/idist/Profile';
import BoardAlbum from 'components/idist/Club/BoardAlbum';
import BoardList from 'components/idist/Club/BoardList';
import BoardCard from 'components/idist/Club/BoardCard';
import { Fliter } from 'components/idist/Fliter';
import { Loader } from 'components/idist/Loader';
import ToggleBtn from 'components/idist/ToggleBtn';
import SideMember from './SideMember';
import SideEvent from './SideEvent';

function MemberProfile() {
  const clubId = useOutletContext();
  const [postsState, setPostsState] = useState('LIST_TYPE');
  const [openFilter, setOpenFilter] = useState(false);
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const { posts } = useSelector((state) => state.post);
  const { profile } = useSelector((state) => state.profile);
  const [postListState, setPostListState] = useState('post');

  useEffect(() => {
    dispatch(getProfileInit({ id: memberId }));
  }, []);

  useEffect(() => {
    let parameters = '';
    if (postListState === 'like') {
      parameters = { is_liked: true };
    } else if (postListState === 'comment') {
      parameters = { is_commented: true };
    } else if (postListState === 'draft') {
      parameters = { is_temporary: true };
    } else {
      parameters = { profile: memberId };
    }
    dispatch(getPostsInit({ parameters: parameters }));
  }, [postListState]);
  if (profile.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );

  return (
    <div className="club-home container">
      <div className="item">
        <div className="club-home-content">
          <div className="member-profile">
            <div>
              <img
                src={
                  profile.data.user.profile_image_url
                    ? profile.data.user.profile_image_url
                    : require('images/club/member.jpeg')
                }
              />
            </div>
            <div className="member-profile-content">
              <div className="member-profile-name">{profile.data.user.username}</div>

              <div className="member-profile-info">
                <div className="profile-rating flex-center">{profile.data.grade_name}</div>
                <div className="profile-level flex-center">LV {profile.data.level}</div>
              </div>
              <div className="member-profile-counter ">
                <div className="member-profile-counter-info flex-center">
                  <div className="member-profile-counter-info-title">Visit</div>
                  <div className="member-profile-counter-info-content">{profile.data.visit_count}</div>
                </div>
                <div className="member-profile-counter-info flex-center">
                  <div className="member-profile-counter-info-title">Posts</div>
                  <div className="member-profile-counter-info-content">{profile.data.post_count}</div>
                </div>
                <div className="member-profile-counter-info flex-center">
                  <div className="member-profile-counter-info-title">Comments</div>
                  <div className="member-profile-counter-info-content">{profile.data.comment_count}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="member-profile-tap">
            <div className={'item ' + (postListState === 'post' && 'active')} onClick={() => setPostListState('post')}>
              Post
            </div>
            <div
              className={'item ' + (postListState === 'comment' && 'active')}
              onClick={() => setPostListState('comment')}
            >
              Comment
            </div>
            <div className={'item ' + (postListState === 'like' && 'active')} onClick={() => setPostListState('like')}>
              Like
            </div>
            <div
              className={'item ' + (postListState === 'draft' && 'active')}
              onClick={() => setPostListState('draft')}
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

          {postsState === 'ALBUM_TYPE' && <BoardAlbum DataList={posts?.data} />}
          {postsState === 'LIST_TYPE' && <BoardList DataList={posts?.data} />}
          {postsState === 'CARD_TYPE' && <BoardCard DataList={posts?.data} />}
        </div>
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}

        <div>
          <SideEvent />
          <SideMember />
        </div>
      </div>
    </div>
  );
}

export default MemberProfile;
