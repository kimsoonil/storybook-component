/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateCalculation } from 'utils/dateCalculation';

function PostRecent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsInit({ parameters: { profile: props.post.data.profile.id } }));
  }, []);

  return (
    <div className="posts-recent club-home-content">
      <div className="flex-between">
        <div className="flex-center ">
          <div className="posts-recent-img">
            <img
              src={
                props.post.data?.profile?.user?.profile_image_url
                  ? props.post?.data?.profile?.user?.profile_image_url
                  : require('images/main/temporary-profile.png')
              }
              alt=""
            />
          </div>
          <div className="posts-recent-title">
            <div className="posts-recent-name">{props.post?.data?.profile?.user?.username}</div> recent post
          </div>
        </div>
        <div
          className="see-all"
          onClick={() =>
            navigate(`/club/${props?.post?.data?.club}/memberProfile/${props?.post?.data?.profile?.user?.id}`, {
              replace: true
            })
          }
        >
          See all
        </div>
      </div>
      <div className="posts-recent-container">
        {posts?.data?.map((postItem, index) => {
          if (index < 5)
            return (
              <div
                className="posts-recent-container-item"
                key={index}
                onClick={() => navigate(`/club/${postItem.club}/post/${postItem.id}`, { replace: true })}
              >
                <div className="posts-recent-container-img">
                  <img src={require('images/club/post-image.png')} />
                </div>
                <div className="posts-recent-container-content">{postItem.title}</div>
                <div className="posts-recent-container-data">{dateCalculation(postItem?.created)}</div>
              </div>
            );
        })}
      </div>
    </div>
  );
}

export default PostRecent;
