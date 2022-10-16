/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { getTagsInit } from 'redux/idistStore/tagSlice';
import { dateCalculation } from 'utils/dateCalculation';
import InputPopup from 'components/idist/popup/inputPopup';
import { Loader } from 'components/idist/Loader';
import 'assets/scss/main.scss';

function PopularPosts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { posts } = useSelector((state) => state.post);
  const { tags } = useSelector((state) => state.tag);
  const [selectTag, setSelectTag] = useState('');
  const [postPassword, setPostPassword] = useState();
  const [postData, setPostData] = useState();
  const [secretOpen, setSecretOpen] = useState(false);

  useEffect(() => {
    dispatch(getPostsInit({ parameters: { tag_name: selectTag } }));
    dispatch(getTagsInit());
  }, [dispatch, selectTag]);

  useEffect(() => {
    setPostPassword('');
  }, [secretOpen]);

  const handleClickPosts = (postsItem) => {
    if (postsItem.is_secret) {
      setSecretOpen(!secretOpen);
      setPostData(postsItem);
    } else {
      navigate(`/club/${postsItem.club}/post/${postsItem.id}`);
    }
  };

  const secretPosts = () => {
    if (postPassword == postData.password) {
      navigate(`/club/${postData.club}/post/${postData.id}`);
    } else {
      alert('비밀번호가 다릅니다.');
    }
  };
  const handleClickTag = (item) => {
    if (selectTag === item) {
      setSelectTag('');
    } else {
      setSelectTag(item);
    }
  };

  return (
    <div className="home-box popular-posts ">
      <div className="flex-between">
        <div className="clubs-title">Popular Posts</div>
        <div className="see-all" onClick={() => navigate(`/clubs/search/posts`)}>
          See all
        </div>
      </div>
      <div className="tags">
        {tags.message !== 'ok' ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : (
          tags.data.map((item, index) => {
            if (index < 15) {
              return (
                <div
                  className={'item flex-center ' + (selectTag === item.title ? 'active' : '')}
                  key={index}
                  onClick={() => handleClickTag(item.title)}
                >
                  # {item.title}
                </div>
              );
            }
          })
        )}
      </div>
      {posts.message !== 'ok' ? (
        <div className="flex-center">
          <Loader />
        </div>
      ) : (
        <div className="posts-list">
          {posts.data.map((postsItem, index) => {
            if (index < 4)
              return (
                <div className="posts-list-item relative" key={index} onClick={() => handleClickPosts(postsItem)}>
                  <div className="posts-list-item-container">
                    <div className="posts-list-item-title">
                      {postsItem.title} {postsItem.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
                    </div>
                    <div
                      className="posts-list-item-content"
                      dangerouslySetInnerHTML={{ __html: postsItem.content }}
                    ></div>
                    <div className="posts-list-item-profile">
                      <div className="posts-list-item-profile-img">
                        <img
                          src={
                            postsItem.profile.user.profile_image_url
                              ? postsItem.profile.user.profile_image_url
                              : require('images/main/temporary-profile.png')
                          }
                        />
                      </div>
                      <div>
                        <div className="posts-list-item-nick">{postsItem.profile.user.username}</div>
                        <div className="posts-list-item-info">
                          <div className="flex-center">
                            <img src={require('images/main/icon-view.png')} /> {postsItem.view_count}
                          </div>
                          <div className="flex-center">
                            <img src={require('images/main/icon-comment.png')} /> {postsItem.comment_count}
                          </div>
                          <div className="flex-center">{dateCalculation(postsItem.created)}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="posts-img ">
                    <img src={postsItem.thumbnail_image_url} alt="" />
                  </div>
                </div>
              );
          })}
        </div>
      )}
      <InputPopup
        open={secretOpen}
        setOpen={setSecretOpen}
        value={postPassword}
        setValue={setPostPassword}
        secretPosts={secretPosts}
      />
    </div>
  );
}

export default PopularPosts;
