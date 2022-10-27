/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import InputPopup from 'components/idist/popup/inputPopup';
import { dateCalculation } from 'utils/dateCalculation';
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
      {props.DataList.length > 0 ? (
        props.DataList?.map((item, index) => {
          if (item.thumbnail_image_url)
            return (
              <div className="board-album-item relative" key={index} onClick={() => handleClickPosts(item)}>
                {item.thumbnail_image_url && (
                  <div className="board-album-img ">
                    <img src={item.thumbnail_image_url} alt="" />
                  </div>
                )}
                <div className="board-album-item-container">
                  <div className="board-album-item-nick">
                    {item.profile.user.username}
                    {item?.profile?.staff_title === null ? (
                      <>
                        <div className="profile-rating flex-center">{item?.profile?.grade_title}</div>
                        <div className="profile-level">LV {item?.profile?.level}</div>
                      </>
                    ) : (
                      <div className="profile-staff flex-center">{item?.profile?.staff_title}</div>
                    )}
                    <div className="board-list-item-date">{dateCalculation(item.created)}</div>
                  </div>
                  <div className="board-album-item-title">{item.title}</div>
                  <div className="posts-list-item-info">
                    <div className="flex-center">
                      <img src={require('images/main/icon-view.png')} /> {item.view_count}
                    </div>
                    <div className="flex-center">
                      <img src={require('images/main/icon-comment.png')} /> {item.comment_count}
                    </div>
                  </div>
                </div>
              </div>
            );
        })
      ) : (
        <div className="no-data flex-center">
          <div>
            <img src={require('images/Error/img_error_page.png')} alt="" />
          </div>
          <div className="no-data-title">No search results found</div>
          <div className="no-data-content">Try searching with a different keyword.</div>
        </div>
      )}
      {props.posts.count === props.DataList.length || props.DataList.length <= 0 ? (
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
