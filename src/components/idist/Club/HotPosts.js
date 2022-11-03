/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Loader } from 'components/idist/Loader';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import { dateCalculation } from 'utils/dateCalculation';

function HotPosts(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsInit({ parameters: '' }));
  }, []);

  if (posts.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }

  return posts.data.length ? (
    <div className="club-home-content hotPosts">
      <div className="flex-between">
        <div className="side-box-title">Hot Posts</div>
        <div className="see-all" onClick={() => navigate()}>
          See all
        </div>
      </div>
      <div className="hotPosts-content">
        {posts.data.map((postsItem, index) => {
          if (index < 6)
            return (
              <div className="hotPosts-content-list flex-between" key={index}>
                <div className="">
                  <div className="hotPosts-content-name">{postsItem?.user?.username}</div>
                  <div className="hotPosts-content-title">{postsItem?.title}</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    {postsItem.view_count} {dateCalculation(postsItem.created)}
                  </div>
                </div>
                <div>{postsItem?.thumbnail_image_url ? <img src={postsItem.thumbnail_image_url} /> : <div></div>}</div>
              </div>
            );
        })}
      </div>
    </div>
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default HotPosts;
