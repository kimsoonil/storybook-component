/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getClubsInit } from 'redux/idistStore/clubSlice';
import { Loader } from 'components/idist/Loader';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import { useState } from 'react';

function MyClubs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { join } = useSelector((state) => state.club);

  useEffect(() => {
    dispatch(getClubsInit({ parameters: { is_joined: true }, type: 'join' }));
  }, [dispatch]);

  if (join.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );

  return join.data.length !== 0 ? (
    <div className="side-box myClubs">
      <div className="flex-between">
        <div className="side-box-title">My Clubs</div>
        <div className="see-all" onClick={() => navigate('/clubs/myclub')}>
          See all
        </div>
      </div>
      <div className="side-box-meun">
        <div className="myClubs-content">
          {join.data.map((clubItem, clubIndex) => {
            if (clubIndex < 6)
              return (
                <div className="myClubs-list" key={clubIndex} onClick={() => navigate(`/club/${clubItem.id}/home`)}>
                  <div className="myClubs-list-img">
                    <img
                      src={
                        clubItem.profile_image_url ? clubItem.profile_image_url : require('images/club/club-dummy.png')
                      }
                      alt=""
                    />
                  </div>
                  <div className="myClubs-list-item">
                    <div className="myClubs-list-item-name">{clubItem.title}</div>

                    <div className="myClubs-list-item-info">
                      <div>
                        <img src={require('images/main/icon-user.png')} />
                      </div>
                      <div className="flex-center">
                        {clubItem.member_count}
                        {/* <div className={'color-' + clubItem.master.grade_title} style={{ marginLeft: '6px' }}>
                            {clubItem.master.grade_title}
                          </div> */}
                      </div>
                    </div>
                  </div>
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

export default MyClubs;
