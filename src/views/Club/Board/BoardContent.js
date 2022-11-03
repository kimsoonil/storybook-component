/* eslint-disable */

import React, { useState, useEffect } from 'react';
import BoardAlbum from 'components/idist/Club/BoardAlbum';
import BoardList from 'components/idist/Club/BoardList';
import BoardCard from 'components/idist/Club/BoardCard';
import { Fliter } from 'components/idist/Fliter';
import ToggleBtn from 'components/idist/ToggleBtn';

function BoardContent(props) {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className="club-home-content ">
      <div className="flex-between">
        <div>
          <div className="club-home-title">{props.board?.data?.title}</div>
          <div className="club-home-description">{props.board?.data?.description}</div>
        </div>
        <div className="flex-center  relative">
          <input type="text" className="post-fliter" />
          <div className="fliter-icon " onClick={() => setOpenFilter(!openFilter)}>
            <img src={require(`images/club/icon-fliter.png`)} alt="" />
          </div>
          <div className="fliter-position" style={{ display: openFilter ? 'flex' : 'none' }}>
            <Fliter doneFuc={() => setOpenFilter(!openFilter)} />
          </div>
        </div>
      </div>
      <div className="flex-between">
        <div className="club-list-tag">
          <div className="list-filter flex-center">
            <div className="flex-center active">Hot</div>
            <div className="flex-center">Popular</div>
            <div className="flex-center">New</div>
          </div>
        </div>
        <div className="flex-center">
          <div className="feed">
            New feed
            <ToggleBtn id={'newFeed'} />
          </div>

          <div className="board-state">
            <div
              className={'album ' + (props.postsState === 'ALBUM_TYPE' && 'active')}
              onClick={() => {
                props.setPostsState('ALBUM_TYPE');
              }}
            ></div>
            <div
              className={'list ' + (props.postsState === 'LIST_TYPE' && 'active')}
              onClick={() => {
                props.setPostsState('LIST_TYPE');
              }}
            ></div>
            <div
              className={'card ' + (props.postsState === 'CARD_TYPE' && 'active')}
              onClick={() => {
                props.setPostsState('CARD_TYPE');
              }}
            ></div>
          </div>
        </div>
      </div>

      {props.postsState === 'ALBUM_TYPE' && <BoardAlbum DataList={props.postsList} posts={props.posts} />}
      {props.postsState === 'LIST_TYPE' && <BoardList DataList={props.postsList} posts={props.posts} />}
      {props.postsState === 'CARD_TYPE' && <BoardCard DataList={props.postsList} posts={props.posts} />}
    </div>
  );
}

export default BoardContent;
