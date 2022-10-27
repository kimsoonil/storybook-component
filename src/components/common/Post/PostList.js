/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateCalculation } from 'utils/dateCalculation';

function PostConent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsInit({ parameters: { profile: props?.post?.data?.profile?.id } }));
  }, []);

  return (
    <div className="posts-lists club-home-content">
      <div className="flex-between posts-lists-header">
        <div className="posts-lists-title ">
          <div
            className="posts-lists-nav"
            onClick={() => navigate(`/club/${props?.id}/board/${props?.post?.data.board}`)}
          >
            {props.post.data.board_group_title} &gt; {props.post.data.board_title}
          </div>
          <div>Board writing</div>
        </div>
        <div className="see-all">See all</div>
      </div>
      <div className="flex-between posts-lists-explain">
        <div>Prev</div>
        <div>Next</div>
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
            <div className="posts-lists-container-data">
              <div className="flex-center">
                <img src={require('images/main/icon-view.png')} /> 1,1K
              </div>
              <div className="flex-center">
                <img src={require('images/main/icon-comment.png')} /> 250
              </div>
              <div className="flex-center">
                <img src={require('images/club/icon-like.png')} /> 158
              </div>
              <div>2m age</div>
            </div>
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
            <div className="posts-lists-container-data">
              <div className="flex-center">
                <img src={require('images/main/icon-view.png')} /> 1,1K
              </div>
              <div className="flex-center">
                <img src={require('images/main/icon-comment.png')} /> 250
              </div>
              <div className="flex-center">
                <img src={require('images/club/icon-like.png')} /> 158
              </div>
              <div>2m age</div>
            </div>
          </div>
          <div className="dummy-img"></div>
        </div>
      </div>
    </div>
  );
}

export default PostConent;
