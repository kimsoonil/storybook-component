/* eslint-disable */

import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import InputPopup from 'components/idist/popup/inputPopup';
import { Loader } from 'components/idist/Loader';

function BoardAlbum(props) {
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
    <div className="board-album">
      {props.DataList?.map((item, index) => {
        if (item.thumbnail_image_url !== null)
          return (
            <div className="board-album-item relative" key={index} onClick={() => handleClickPosts(item)}>
              {item.thumbnail_image_url !== null && (
                <div className="board-album-img ">
                  <img src={item.thumbnail_image_url} alt="" />
                </div>
              )}
              <div className="board-album-item-container">
                <div className="board-album-item-nick">{item.nickname}</div>
                <div className="board-album-item-title">{item.title}</div>
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

export default BoardAlbum;
