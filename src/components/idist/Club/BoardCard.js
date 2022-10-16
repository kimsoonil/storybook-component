/* eslint-disable */

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { Loader } from 'components/idist/Loader';
import InputPopup from 'components/idist/popup/inputPopup';

function BoardCard(props) {
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
    <div className="board-card">
      {props.DataList.map((item, index) => {
        return (
          <div className="board-card-item relative" key={index} onClick={() => handleClickPosts(item)}>
            {item.thumbnail_image_url !== null && (
              <div className="board-card-img ">
                <img src={item.thumbnail_image_url} alt="" />
              </div>
            )}
            <div className="board-card-item-container">
              <div className="posts-list-item-profile">
                <div className="posts-list-item-profile-img">
                  <img src={item.profile.user.profile_image_url} />
                </div>
                <div>
                  <div className="posts-list-item-nick">{item.profile.user.username}</div>
                  <div className="board-list-item-date">{dayjs(item.profile.created).format('YYYY.MM.DD')}</div>
                </div>
              </div>
              <div className="board-card-item-title">
                {item.title} {item.is_secret && <img src={require('images/club/ic-lock.png')} alt="" />}
              </div>
              <div className="board-card-item-content" dangerouslySetInnerHTML={{ __html: item.content }}></div>
              <div className="board-card-item-info">{/* View {item.view} ・ Comment {item.comment} {item.data} */}</div>
            </div>
          </div>
        );
      })}
      {props.posts.count === props.DataList.length ? (
        <div></div>
      ) : (
        <div className="flex-center">
          <Loader />
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

export default BoardCard;
