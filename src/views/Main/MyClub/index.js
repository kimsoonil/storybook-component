/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import { getClubsInit, postClubPinInit, postClubUnpinInit } from 'redux/idistStore/clubSlice';
import MainTap from '../MainTap';
import Profile from 'components/idist/Profile.js';
import MyClubItem from './MyClubItem';
import { Loader } from 'components/idist/Loader';

function MyClub() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { join, managing } = useSelector((state) => state.club);
  const { id } = useParams();
  const [dataLength, setDataLength] = useState(0);
  useEffect(() => {
    dispatch(getUserInit());
    dispatch(getClubsInit({ parameters: { is_joined: true }, type: 'join' }));
    dispatch(getClubsInit({ parameters: { is_managing: true }, type: 'managing' }));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 914);
  }, []);
  const handleClickPin = (e, pin, id, parameters) => {
    e.stopPropagation();
    if (pin) {
      dispatch(
        postClubUnpinInit({
          id: id,
          actionList: [
            { type: getClubsInit.type, payload: { parameters: { is_joined: true }, type: 'join' } },
            { type: getClubsInit.type, payload: { parameters: { is_managing: true }, type: 'managing' } }
          ]
        })
      );
    } else {
      dispatch(
        postClubPinInit({
          id: id,
          actionList: [
            { type: getClubsInit.type, payload: { parameters: { is_joined: true }, type: 'join' } },
            { type: getClubsInit.type, payload: { parameters: { is_managing: true }, type: 'managing' } }
          ]
        })
      );
    }
  };
  useEffect(() => {
    if (managing.message === 'ok' && join.message === 'ok') setDataLength(managing.data.length + join.data.length);
  }, [managing, join]);

  return (
    <div className="main">
      <div className="container">
        <div className="item">
          <MainTap />
          <div className="myclub">
            <div className="myclub-title">My clubs</div>
            {dataLength !== 0 ? (
              <>
                {managing.message === 'ok' ? (
                  managing.data.length !== 0 ? (
                    <div className="myclub-managing">
                      {managing.data.map((clubItem, clubIndex) => {
                        if (clubIndex < 6)
                          return <MyClubItem clubItem={clubItem} key={clubIndex} handleClickPin={handleClickPin} />;
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div className="flex-center">
                    <Loader />
                  </div>
                )}

                <div className="myclub-join">
                  {join.message === 'ok' ? (
                    join.data.map((clubItem, clubIndex) => {
                      if (clubIndex < 6)
                        return <MyClubItem clubItem={clubItem} key={clubIndex} handleClickPin={handleClickPin} />;
                    })
                  ) : (
                    <div className="flex-center">
                      <Loader />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="no-data flex-center">
                <div>
                  <img src={require('images/Error/img_error_page.png')} alt="" />
                </div>
                <div className="no-data-title">No search results found</div>
                <div className="no-data-content">Try searching with a different keyword.</div>
              </div>
            )}
          </div>
        </div>

        <div className="item">
          {user.data ? (
            user.data.id !== null ? (
              <Profile userData={user.data} type={'login'} />
            ) : (
              <Profile type={'logout'} />
            )
          ) : (
            <Profile type={'logout'} />
          )}
          <div className="chatting">
            <img src={require(`images/main/chatting.png`)} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyClub;
