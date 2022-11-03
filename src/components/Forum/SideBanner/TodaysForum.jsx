/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { addComma } from 'util/common';
import { useDispatch, useSelector } from 'react-redux';
import { reqTodayForum } from 'redux/store/forum/forumListSlice';
import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';

function TodaysForum() {
  const { thumbnail_image, title, id } = useSelector((state) => ({
    ...state.forumList.todayForum
  }));
  const { forumIdPostList } = useSelector((state) => ({ ...state.forumIdPostList }));

  // forumlist에서 마지막 꺼 조회 { odering : '-created' ,page_size = 1 }
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reqTodayForum({ odering: '-created', page_size: 1 }));
  }, []);

  useEffect(() => {
    if (id) dispatch(reqForumIdPostList({ forumId: id, page_size: 5 }));
  }, [id]);

  return (
    <div className="today_forum" onClick={() => navigate(`/forum/${id}/theme`)} aria-hidden>
      <div className="content_subtitle">
        <h4 className="h4Type eng">Today’s Forum</h4>
      </div>
      <div className="today_forum_thum">
        <img src={thumbnail_image} alt="" />
        <div className="today_forum_thum_title">
          <span>{title}</span>
        </div>
      </div>
      <ul>
        {forumIdPostList?.map((item) => (
          <li key={item.id}>
            <div className="new_forum_img">
              <img src={item.thumbnail_image_url} alt="" />
            </div>
            <dl>
              <dt>
                <span className="list_title">{item.title} </span>
                <span className="list_num">({item.post_count ? item.post_count : '0'})</span>
              </dt>
              <dd>
                <div className="emoji_group">
                  <span className="emoji like" />
                  <span className="emoji fun" />
                  <span className="emoji_num">{item.comment_count}</span>
                </div>
                <div className="view_num">
                  <span>{addComma(item.visit_count)}</span>
                </div>
              </dd>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodaysForum;
