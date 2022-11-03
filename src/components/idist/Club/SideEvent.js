/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getClubPostsInit } from 'redux/idistStore/postsSlice';
import { dateCalculation } from 'utils/dateCalculation';

function SideEvent(props) {
  const clubId = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { eventPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getClubPostsInit({ id: id, parameters: { is_event: true }, type: 'event' }));
  }, [dispatch]);

  if (eventPosts.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }
  return eventPosts.data.length !== 0 ? (
    <div className="side-box">
      <div className="flex-between">
        <div className="side-box-title">Event</div>
        <div className="see-all" onClick={() => navigate(`/club/${clubId.data.id}/board/3`)}>
          See all
        </div>
      </div>
      <div className="notice-content">
        {eventPosts.data.map((eventItem, index) => {
          if (index < 2)
            return (
              <div
                className="notice-content-item"
                key={index}
                onClick={() => navigate(`/club/${eventItem.club}/post/${eventItem.id}`)}
              >
                <div
                  className="notice-content-item-explain"
                  dangerouslySetInnerHTML={{ __html: eventItem.content }}
                ></div>
                <div className="notice-content-item-date">{dateCalculation(eventItem.created)}</div>
              </div>
            );
        })}
      </div>
    </div>
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default SideEvent;
