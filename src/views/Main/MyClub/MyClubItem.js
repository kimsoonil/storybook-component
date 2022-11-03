/* eslint-disable */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MyClubItemContent from './MyClubItemContent';
import { getClubPostsInit } from 'redux/idistStore/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'components/idist/Loader';

function MyClubItem(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getClubPostsInit({ id: props.clubItem.id }));
  }, [dispatch]);

  return (
    <div className="myclub-item" onClick={() => navigate(`/club/${props.clubItem.id}/home`)}>
      <div className="myclub-item-img">
        <img
          src={
            props.clubItem.profile_image_url ? props.clubItem.profile_image_url : require('images/club/club-dummy.png')
          }
        />
        <div className="myclub-item-profile-img">
          <img
            src={
              props.clubItem.profile_image_url
                ? props.clubItem.profile_image_url
                : require('images/club/club-profile.png')
            }
          />
        </div>
      </div>
      {posts.message === 'ok' ? (
        <MyClubItemContent posts={posts} clubItem={props.clubItem} handleClickPin={props.handleClickPin} />
      ) : (
        <div className="flex-center">
          <Loader />
        </div>
      )}
      {/* <div className="myclub-item-content">
        <div className="myclub-item-title">{props.clubItem.title}</div>
        <div className="myclub-item-count">New post {posts.count}</div>
        {posts.message === 'ok' ? (
          posts.data.map((postsItem, index) => {
            <MyClubItemContent postsItem={postsItem} key={index} />;
          })
        ) : (
          <div className="flex-center">
            <Loader />
          </div>
        )}
      </div> */}
    </div>
  );
}

export default MyClubItem;
