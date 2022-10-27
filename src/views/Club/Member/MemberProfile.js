/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import { getPostsInit, getMorePostsInit } from 'redux/idistStore/postsSlice';
import { getProfileInit } from 'redux/idistStore/profileSlice';
import Profile from 'components/idist/Profile';
import { Loader } from 'components/idist/Loader';
import SideMember from 'components/idist/Club/SideMember';
import SideEvent from 'components/idist/Club/SideEvent';
import MemberProfileContent from './MemberProfileContent';

function MemberProfile() {
  const clubId = useOutletContext();
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const { posts, postsList } = useSelector((state) => state.post);
  const { profile } = useSelector((state) => state.profile);
  const [postListState, setPostListState] = useState('post');
  const [isBottom, setIsBottom] = useState(false);
  const parameters = {
    page_size: 20
  };

  useEffect(() => {
    dispatch(getProfileInit({ id: memberId }));
  }, []);

  useEffect(() => {
    if (postListState === 'like') {
      parameters.is_liked = true;
    } else if (postListState === 'comment') {
      parameters.is_commented = true;
    } else if (postListState === 'draft') {
      parameters.is_temporary = true;
    } else {
      parameters.profile = memberId;
    }
    dispatch(getPostsInit({ parameters: parameters }));
  }, [postListState]);

  useEffect(() => {
    if (isBottom) {
      dispatch(getMorePostsInit({ parameters: parameters }));

      setIsBottom(false);
    }
  }, [isBottom, postsList, dispatch, setIsBottom]);

  // Handle user scrolling the page
  function handleUserScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, []);

  if (profile.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );

  return (
    <div className="club-home container">
      <div className="item">
        <MemberProfileContent
          profile={profile}
          posts={posts}
          postsList={postsList}
          postListState={postListState}
          setPostListState={setPostListState}
        />
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
