/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import { dateCalculation } from 'utils/dateCalculation';

function Notion(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { noticePosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getClubPostsInit({ id: props.clubId.data.id, parameters: { is_notice: true }, type: 'notion' }));
  }, [dispatch]);

  if (noticePosts.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }
  return noticePosts.data.length !== 0 ? (
    <div>
      <div className="club-home-content side-box notice">
        <div className="flex-between">
          <div className="side-box-title">Notice</div>
          <div
            className="see-all"
            onClick={() =>
              navigate(`/club/${props.clubId.data.id}/board/${props.clubId.data.board_groups[0].boards[1].id}`)
            }
          >
            See all
          </div>
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
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default Notion;
