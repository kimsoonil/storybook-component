/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dateCalculation } from 'utils/dateCalculation';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getPostsInit, getMorePostsInit } from 'redux/idistStore/postsSlice';
import { getTagsInit } from 'redux/idistStore/tagSlice';

import InputPopup from 'components/idist/popup/inputPopup';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';
import 'assets/scss/search.scss';

function PostsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [secretOpen, setSecretOpen] = useState(false);
  const [selectTag, setSelectTag] = useState('');
  const { tags } = useSelector((state) => state.tag);
  const [postData, setPostData] = useState();
  const [postPassword, setPostPassword] = useState();
  const { posts, postsList } = useSelector((state) => state.post);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isBottom, setIsBottom] = useState(false);
  const limit = props.limit;
  const search = searchParams.get('search');
  let parameters = {
    search: search,
    tag_name: selectTag,
    page_size: limit
  };

  useEffect(() => {
    dispatch(getPostsInit({ parameters: parameters }));
    dispatch(getTagsInit());
  }, [searchParams, selectTag]);

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
  useEffect(() => {
    if (isBottom) {
      dispatch(getMorePostsInit({ parameters: parameters }));

      setIsBottom(false);
    }
  }, [isBottom, postsList, dispatch, setIsBottom]);

  function handleUserScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }
  useEffect(() => {
    if (props.searchTab !== 'posts') return;
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, []);
  // console.log(posts.count);
  console.log(postsList);
  if (posts.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="search-post">
      <div className="flex-between">
        <div className="search-club-title">{posts.count} Posts</div>
        <div className="list-filter flex-center">
          <div className="flex-center active">Hot</div>
          <div className="flex-center">Popular</div>
          <div className="flex-center">New</div>
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
      <div className="posts-list">
        {postsList.map((postsItem, index) => {
          return (
            <div
              className="posts-list-item relative"
              key={index}
              style={{ borderTop: index < 2 ? '0' : '1px solid #cdcdd1' }}
              onClick={() => handleClickPosts(postsItem)}
            >
              <div className="posts-list-item-container">
                <div className="posts-list-item-title">
                  {postsItem.title} {postsItem.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
                </div>
                <div className="posts-list-item-content" dangerouslySetInnerHTML={{ __html: postsItem.content }}></div>
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
        <InputPopup
          open={secretOpen}
          setOpen={setSecretOpen}
          value={postPassword}
          setValue={setPostPassword}
          secretPosts={secretPosts}
        />
      </div>
      {props.searchTab === 'posts' ? (
        posts.count === postsList.length ? (
          <div></div>
        ) : (
          <div className="flex-center">
            <Loader />
          </div>
        )
      ) : (
        <div className="flex-center">
          <Button
            size="l"
            label={'More'}
            width={116}
            onClick={() => {
              navigate('/clubs/search/posts');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PostsList;
