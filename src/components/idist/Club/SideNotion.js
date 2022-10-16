/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import { dateCalculation } from 'utils/dateCalculation';

function Notion() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noticePosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsInit({ parameters: { is_notice: true }, type: 'notion' }));
  }, [dispatch]);

  if (noticePosts.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="club-home-content side-box notice">
        <div className="flex-between">
          <div className="side-box-title">Notice</div>
          <div className="see-all">See all</div>
        </div>
        <div className="notice-content">
          {noticePosts.data.map((noticeItem, index) => {
            if (index < 2)
              return (
                <div
                  className="notice-content-item"
                  onClick={() => navigate(`/club/${noticeItem.club}/post/${noticeItem.id}`)}
                  key={index}
                >
                  <div
                    className="notice-content-item-explain"
                    dangerouslySetInnerHTML={{ __html: noticeItem.content }}
                  ></div>
                  <div className="notice-content-item-date">{dateCalculation(noticeItem.created)}</div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

export default Notion;
