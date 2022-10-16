/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateCalculation } from 'utils/dateCalculation';
import dayjs from 'dayjs';

function PostConent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsInit({ parameters: { profile: props.post.data.profile.id } }));
  }, []);

  return (
    <div className="posts-lists">
      <div className="flex-between">
        <div>Twice &gt; Nayeon Board writing</div>
        <div>SeeAll</div>
      </div>
      <div className="posts-lists-container">
        <div className="posts-lists-container-item">
          <div className="mr-3">
            <div className="posts-lists-container-name">작성자닉네임</div>
            <div className="posts-lists-container-title">이전 게시글입니다.</div>
            <div className="posts-lists-container-content">
              Lorem ipsum dolor sit amet, consectetur
              <br /> elit, sed do eiusmod tempor incididunt ut labore.
            </div>
            <div className="posts-lists-container-data">View 1,116 · Comments 250 · 2m age</div>
          </div>
          <div className="dummy-img"></div>
        </div>
        <div className="posts-lists-container-item">
          <div className="mr-3">
            <div className="posts-lists-container-name">작성자닉네임</div>
            <div className="posts-lists-container-title">다음 게시글입니다.</div>
            <div className="posts-lists-container-content">
              Lorem ipsum dolor sit amet, consectetur
              <br /> elit, sed do eiusmod tempor incididunt ut labore.
            </div>
            <div className="posts-lists-container-data">View 1,116 · Comments 250 · 2m age</div>
          </div>
          <div className="dummy-img"></div>
        </div>
      </div>
      <div className="posts-recent">
        <div className="flex-between">
          <div className="flex-center">
            <img
              src={
                props.post.data.profile.user.profile_image_url
                  ? props.post.data.profile.user.profile_image_url
                  : require('images/main/temporary-profile.png')
              }
              alt=""
            />
            <div className="posts-recent-title">
              <div className="posts-recent-name">{props.post.data.profile.user.username}</div> recent post
            </div>
          </div>
          <div>SeeAll</div>
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
                  <div className="dummy-img"></div>
                  <div className="posts-recent-container-content">{postItem.title}</div>
                  <div className="posts-recent-container-data">{dateCalculation(postItem?.created)}</div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default PostConent;
