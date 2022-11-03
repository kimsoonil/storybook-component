/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dateCalculation } from 'utils/dateCalculation';
import { getClubPostsInit } from 'redux/idistStore/postsSlice';
import { getTagsInit } from 'redux/idistStore/tagSlice';
import InputPopup from 'components/idist/popup/inputPopup';
import { Loader } from 'components/idist/Loader';

function ClubHomePosts(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectTag, setSelectTag] = useState('');
  const { posts } = useSelector((state) => state.post);
  const { tags } = useSelector((state) => state.tag);
  const [postPassword, setPostPassword] = useState();
  const [postData, setPostData] = useState();
  const [secretOpen, setSecretOpen] = useState(false);

  useEffect(() => {
    dispatch(getClubPostsInit({ id: props.clubId.data.id, parameters: { tag_title: selectTag } }));
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
  if (posts.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );

  return posts.data.length !== 0 ? (
    <div className="club-home-content club-posts">
      <div className="flex-between">
        <div className="club-home-title">Posts</div>
        <div
          className="see-all"
          onClick={() =>
            navigate(`/club/${props.clubId.data.id}/board/${props.clubId.data.board_groups[0].boards[0].id}`)
          }
        >
          See all
        </div>
      </div>
      <div className="club-list-tag">
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
      <div className="club-post-list">
        <div className="posts-list">
          {posts.data.map((postsItem, index) => {
            if (index < 8)
              return (
                <div
                  className="posts-list-item relative"
                  key={index}
                  style={{ borderTop: index < 2 ? '0' : '1px solid #cdcdd1' }}
                  onClick={() => handleClickPosts(postsItem)}
                >
                  <div className="posts-list-item-container">
                    <div className="posts-list-item-title">
                      {postsItem.title}
                      {postsItem.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
                    </div>
                    <div
                      className="posts-list-item-content"
                      dangerouslySetInnerHTML={{ __html: postsItem.content }}
                    ></div>
                    <div className="posts-list-item-profile">
                      <div className="posts-list-item-profile-img">
                        <img
                          onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = require('images/main/temporary-profile.png');
                          }}
                          src={postsItem?.user?.profile_image_url}
                        />
                      </div>
                      <div>
                        <div className="posts-list-item-nick">
                          {postsItem?.user.username}
                          {/* {postsItem?.profile?.staff_title === null ? (
                              <>
                                <div className="profile-rating flex-center">{postsItem?.profile?.grade_title}</div>
                                <div className="profile-level">LV {postsItem?.profile?.level}</div>
                              </>
                            ) : (
                              <div className="profile-staff flex-center">{postsItem?.profile?.staff_title}</div>
                            )} */}
                        </div>
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
      </div>
      <InputPopup
        open={secretOpen}
        setOpen={setSecretOpen}
        value={postPassword}
        setValue={setPostPassword}
        secretPosts={secretPosts}
      />
    </div>
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default ClubHomePosts;
