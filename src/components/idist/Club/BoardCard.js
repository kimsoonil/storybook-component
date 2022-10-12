/* eslint-disable */

import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';

function BoardCard(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <div className="board-card">
      {props.DataList.map((item, index) => {
        return (
          <div
            className="board-card-item relative"
            key={index}
            onClick={() => navigate(`/club/${item.club}/post/${item.id}`)}
          >
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
    </div>
  );
}

export default BoardCard;
