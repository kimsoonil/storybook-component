/* eslint-disable */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostsInit } from 'redux/store/postsSlice';

import { postsList } from '../Home/homeDate';
import 'assets/scss/search.scss';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';

function SearchPosts() {
  const dispatch = useDispatch();
  const postState = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsInit());
  }, []);
  const { isLoading, posts } = postState;

  if (posts.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="search-post">
      <div className="search-club-title"> 2,494 Posts</div>
      <div className="search-post-hashtag">
        <div className="item active flex-center">#Battleground</div>
        <div className="item flex-center">#Kpop</div>
        <div className="item flex-center">#포트리스</div>
        <div className="item flex-center">#Twice</div>
        <div className="item flex-center">#POPPOP</div>
        <div className="item flex-center">#Mobile games</div>
        <div className="item flex-center">#Clan</div>
        <div className="item flex-center">#Dolphin</div>
        <div className="item flex-center">Animals</div>
      </div>
      <div className="search-post-list">
        {posts.data.map((postsItem, index) => {
          return (
            <div className="search-post-list-item relative" key={index}>
              <div className="search-post-list-item-container">
                <div className="search-post-list-item-nick">{postsItem.user.user}</div>
                <div className="search-post-list-item-title">{postsItem.title}</div>
                <div className="search-post-list-item-content"></div>
                <div className="search-post-list-item-info">
                  View {postsItem.likeCount} ・ Comment {postsItem.commentCount}
                </div>
              </div>
              <div className="search-post-img ">
                <img src={postsItem.thumbnailImageUrl} alt="" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex-center">
        <Button size="l" label={'More'} width={116} />
      </div>
    </div>
  );
}

export default SearchPosts;
