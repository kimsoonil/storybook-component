/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { fetchForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dateCalculation } from 'utils/dateCalculation';

function PostRecent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { forumIdPostList } = useSelector((state) => state.forumIdPostList);
  const { posts } = useSelector((state) => state.post);
  const [username, setUsername] = useState();
  const [postdata, setPostdata] = useState([]);
  const [listMax, setListMax] = useState(0);
  useEffect(() => {
    dispatch(getPostsInit({ profile: props.id }));
  }, []);

  useEffect(() => {
    if (props.type === 'club') {
      setUsername(props.post?.data?.profile?.user?.username);
      setListMax(6);
      if (posts.message === 'ok') setPostdata([...posts?.data]);
    } else {
      setListMax(8);
      setUsername(forumIdPostList?.user);
      setPostdata([...forumIdPostList]);
    }
  }, [props.type, posts, forumIdPostList]);

  const recentNavigate = () => {
    if (props.type === 'club') {
      navigate(`/club/${postItem.forum}/post/${postItem.id}`, { replace: true });
    } else {
      navigate(`/forum/${postItem.forum}/post/${postItem.id}`, { replace: true });
    }
  };
  console.log('props.post[0]', props.post.data);
  return (
    <div className="posts-recent club-home-content">
      <div className="flex-between">
        <div className="flex-center ">
          <div className="posts-recent-img">
            <img
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = require('images/main/temporary-profile.png');
              }}
              src={
                props.post?.data?.profile?.user?.profile_image_url
                  ? props.post?.data?.profile?.user?.profile_image_url
                  : require('images/main/temporary-profile.png')
              }
              alt=""
            />
          </div>
          <div className="posts-recent-title">
            <div className="posts-recent-name">{username}</div> recent post
          </div>
        </div>
        {/* <div
          className="see-all"
          onClick={() =>
            navigate(`/club/${forumIdPostList?.forum}/memberProfile/${props?.post?.data?.profile?.user?.id}`, {
              replace: true
            })
          }
        >
          See all
        </div> */}
      </div>
      <div className="posts-recent-container">
        {postdata?.map((postItem, index) => {
          if (index < listMax)
            return (
              <div className="posts-recent-container-item" key={index} onClick={() => recentNavigate(postItem)}>
                <div className="posts-recent-container-img">
                  <img
                    src={
                      postItem.thumbnail_image_url
                        ? postItem.thumbnail_image_url
                        : require('images/club/post-image.png')
                    }
                  />
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
