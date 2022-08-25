/* eslint-disable */

import React from 'react';
import { postsList } from '../Home/homeDate';
import '../../assets/scss/search.scss';
import { Button } from '../../components/Button';

function SearchPosts() {
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
        {postsList.map((postsItem, index) => {
          return (
            <div className="search-post-list-item relative" key={index}>
              <div className="search-post-list-item-container">
                <div className="search-post-list-item-nick">{postsItem.nickname}</div>
                <div className="search-post-list-item-title">{postsItem.title}</div>
                <div className="search-post-list-item-content">{postsItem.content}</div>
                <div className="search-post-list-item-info">
                  View {postsItem.view} ・ Comment {postsItem.comment} {postsItem.data}
                </div>
              </div>
              <div className="search-post-img ">
                <img src={require(`../../images/home/${postsItem.img}`)} alt="" />
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
