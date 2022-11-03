/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubPostsInit } from 'redux/idistStore/postsSlice';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';

function ClubHomeEvent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { eventPosts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getClubPostsInit({ id: props.clubId.data.id, parameters: { is_event: true }, type: 'event' }));
  }, [dispatch]);
  console.log(eventPosts.data);
  if (eventPosts.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }
  return eventPosts.data.length !== 0 ? (
    <div className="club-home-content club-event">
      <div className="flex-between">
        <div className="club-home-title">Event</div>
        <div
          className="see-all"
          onClick={() =>
            navigate(`/club/${props.clubId.data.id}/board/${props.clubId.data.board_groups[0].boards[2].id}`)
          }
        >
          See all
        </div>
      </div>
      <div className="club-event-conent">
        {eventPosts.data.map((eventItem, index) => {
          if (index < 2)
            return (
              <div
                className="club-event-conent-item"
                key={index}
                onClick={() => navigate(`/club/${eventItem.club}/post/${eventItem.id}`)}
              >
                <img src={require('images/club/event.png')} />
                <div className="club-event-conent-item-title">{eventItem.title}</div>
                <div
                  className="club-event-conent-item-explain "
                  dangerouslySetInnerHTML={{ __html: eventItem.content }}
                ></div>
              </div>
            );
        })}
      </div>
    </div>
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default ClubHomeEvent;
