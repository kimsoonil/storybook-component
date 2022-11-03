/* eslint-disable */

import React from 'react';
import 'assets/scss/components.scss';

function MyClubItemContent(props) {
  return (
    <div className="myclub-item-content">
      <div className="flex-between">
        <div className="myclub-item-title">{props.clubItem.title}</div>
        <div
          className="item flex-center "
          onClick={(e) => props.handleClickPin(e, props.clubItem.is_pined, props.clubItem.id)}
        >
          <img
            src={require(props.clubItem.is_pined
              ? `images/club/club-bookmark.png`
              : `images/club/club-bookmark-line.png`)}
            alt=""
          />
        </div>
      </div>
      <div className="myclub-item-count">New post {props.posts.count}</div>
      {props.posts.message === 'ok' ? (
        props.posts.data.map((postsItem, index) => {
          <div className="flex-between" key={index}>
            <div className="myclub-item-post">{postsItem?.title}</div>
            <div className="myclub-item-info">{postsItem?.profile?.user?.username} • 53m age</div>
          </div>;
        })
      ) : (
        <div className="flex-center">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default MyClubItemContent;
