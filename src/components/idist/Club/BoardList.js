/* eslint-disable */

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import InputPopup from 'components/idist/popup/inputPopup';

function BoardList(props) {
  const navigate = useNavigate();

  const [postPassword, setPostPassword] = useState();
  const [postData, setPostData] = useState();
  const [secretOpen, setSecretOpen] = useState(false);

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

  return (
    <div className="board-list">
      {props.DataList?.map((item, index) => {
        return (
          <div className="board-list-item relative" key={index} onClick={() => handleClickPosts(item)}>
            {item.thumbnail_image_url !== null && (
              <div className="board-list-img ">
                <img src={item.thumbnail_image_url} alt="" />
              </div>
            )}
            <div className="board-list-item-container">
              <div className="posts-list-item-profile">
                <div className="posts-list-item-profile-img">
                  <img src={item.profile.user.profile_imageurl} />
                </div>
                <div>
                  <div className="posts-list-item-nick">{item.profile.user.username}</div>
                  <div className="board-list-item-date">{dayjs(item.profile.created).format('YYYY.MM.DD')}</div>
                </div>
              </div>
              <div className="board-list-item-title">
                {item.title}
                {item.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
              </div>
              <div className="board-list-item-content" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              <div className="posts-list-item-info">
                <div className="flex-center">
                  <img src={require('images/main/icon-view.png')} /> {item.view_count}
                </div>
                <div className="flex-center">
                  <img src={require('images/main/icon-comment.png')} /> {item.commentCount}
                </div>
              </div>
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
  );
}

export default BoardList;
