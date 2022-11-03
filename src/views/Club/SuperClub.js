/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Loader } from 'components/idist/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getclubProfilesInit } from 'redux/idistStore/clubSlice';
import Profile from 'components/idist/Profile';
import SideEvent from 'components/idist/Club/SideEvent';
import SideMember from 'components/idist/Club/SideMember';
import { Button } from 'components/idist/Button';

function Member(props) {
  const clubId = useOutletContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.club);
  const [memberState, setMemberState] = useState('member');

  useEffect(() => {
    dispatch(getclubProfilesInit({ id: clubId.data.id }));
  }, [dispatch]);

  return (
    <div className="club-home container">
      <div className="item">
        <div className="club-home-content member-home">
          <div className="club-home-title ">SuperClub</div>
          <div className="superclub-data">
            <div className="superclub-img">
              <img src={require(`images/main/superclub1.png`)} />
            </div>
            <div className="superclub-info">
              <div className="posts-list-item-profile">
                <div className="posts-list-item-profile-img">
                  <img src={require('images/main/temporary-profile.png')} />
                </div>
                <div>
                  <div className="posts-list-item-nick">
                    Kate
                    {/* {postsItem?.profile?.staff_title === null ? (
                      <>
                        <div className="profile-rating flex-center">{postsItem?.profile?.grade_title}</div>
                        <div className="profile-level">LV {postsItem?.profile?.level}</div>
                      </>
                    ) : ( */}
                    <div className="profile-staff flex-center">Master</div>
                    {/* )} */}
                  </div>
                </div>
              </div>
              <div className="superclub-info-title">TWICE KOREA OFFICIAL</div>
              <div className="club-content-explan">
                <div className="club-content-info">
                  <div className="club-content-info-box">
                    <div className="club-content-info-number">{clubId.data.member_count}</div>
                    <div className="club-content-info-title">Memeber</div>
                  </div>
                  <div className="club-content-info-box">
                    <div className="club-content-info-number">{clubId.data.post_count}</div>
                    <div className="club-content-info-title">Post</div>
                  </div>
                  <div className="club-content-info-box">
                    <div className="club-content-info-number">0</div>
                    <div className="club-content-info-title">Clubs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="superclub-list">
            <div className="superclub-list-title flex-center">6 Clubs</div>
            <div className="superclub-list-content relative">
              <div className="superclub-list-content-title">&#123; &#125; club that is with the club!</div>
              {[...Array(6)].map((e, index) => {
                return (
                  <div className="superclub-list-item-data" key={index}>
                    <div className="superclub-list-item-img">
                      <img src={require(`images/main/superclub1.png`)} />
                    </div>
                    <div className="superclub-list-info ">
                      <div className="posts-list-item-profile flex-center">
                        <div className="posts-list-item-profile-img">
                          <img src={require('images/main/temporary-profile.png')} />
                        </div>
                        <div>
                          <div className="posts-list-item-nick">
                            Kate
                            <div className="profile-staff flex-center">Master</div>
                          </div>
                        </div>
                      </div>
                      <div className="superclub-list-item-title">TWICE KOREA</div>
                      <div className="club-content-explan">
                        <div className="club-content-info">
                          <div className="club-content-info-box">
                            <div className="club-content-info-number">{clubId.data.member_count}</div>
                            <div className="club-content-info-title">Memeber</div>
                          </div>
                          <div className="club-content-info-box">
                            <div className="club-content-info-number">{clubId.data.post_count}</div>
                            <div className="club-content-info-title">Post</div>
                          </div>
                          <div className="club-content-info-box">
                            <div className="club-content-info-number">0</div>
                            <div className="club-content-info-title">Clubs</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex-center" style={{ padding: '50px 0 30px' }}>
              <Button label={'Build a club together!'} size={'xl'} width={367} />
            </div>
          </div>
        </div>
      </div>

      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data} type={'club'} /> : <Profile type={'logout'} />}
        <div>
          <SideEvent />
          <SideMember />
        </div>
      </div>
    </div>
  );
}

export default Member;
