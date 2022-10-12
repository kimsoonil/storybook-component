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
  const { myclubs } = useSelector((state) => state.club);
  const [tapState, setTapState] = useState('myclub');
  useEffect(() => {
    let parameters = {};
    if (tapState === 'myclub') {
      parameters = { is_joined: true };
    } else {
      parameters = { is_managing: true };
    }

    dispatch(getClubsInit({ parameters: parameters, type: 'myclub' }));
  }, [dispatch, tapState]);

  return (
    <div className="side-box myClubs">
      <div className="flex-between">
        <div className="side-box-title">My Clubs</div>
        <div className="see-all">See all</div>
      </div>
      <div className="side-box-meun">
        <div className="flex-center">
          <div
            className={'side-box-tap flex-center ' + (tapState === 'myclub' && 'active')}
            onClick={() => setTapState('myclub')}
          >
            My Clubs
          </div>
          <div
            className={'side-box-tap flex-center ' + (tapState === 'mager' && 'active')}
            onClick={() => setTapState('mager')}
          >
            Manger
          </div>
        </div>

        <div className="myClubs-content">
          {myclubs.message === 'ok' ? (
            myclubs.data.map((clubItem, clubIndex) => {
              if (clubIndex < 6)
                return (
                  <div className="myClubs-list" key={clubIndex} onClick={() => navigate(`/club/${clubItem.id}/home`)}>
                    <div className="myClubs-list-img">
                      <img
                        src={
                          clubItem.thumbnail_image_url
                            ? clubItem.thumbnail_image_url
                            : require('images/club/club-dummy.png')
                        }
                        alt=""
                      />
                    </div>
                    <div className="myClubs-list-item">
                      <div className="myClubs-list-item-name">{clubItem.name}</div>

                      <div className="myClubs-list-item-info">
                        <div>
                          <img src={require('images/main/icon-user.png')} />
                        </div>
                        <div>{clubItem.member_count} M Sliver</div>
                      </div>
                    </div>
                  </div>
                );
            })
          ) : (
            <div className="flex-center">
              <Loader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyClubs;
