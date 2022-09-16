/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIdClubInit, postClubShareInit } from 'redux/store/clubSlice';
import { useParams } from 'react-router';
import { useNavigate, Outlet } from 'react-router-dom';
import { Header } from 'components/Header';
import { Loader } from 'components/Loader';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import SharePopup from '../../components/SharePopup';
import { Button } from 'components/Button';

function Club() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clubState = useSelector((state) => state.club);
  const { id } = useParams();
  const boardGrop = window.location.pathname.split('/');
  const [bookmark, setBookmark] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  useEffect(() => {
    dispatch(getIdClubInit(id));
  }, [dispatch]);

  const seachFunc = () => {
    navigate('/search/all');
  };
  const { clubId } = clubState;

  useEffect(() => {
    if (clubId.data) {
      setBookmark(clubId.data.pin.isActive);
    }
  }, [clubId]);

  if (clubId.message !== 'ok')
    return (
      <div className="root-center">
        <Loader />
      </div>
    );

  return (
    <div id="root">
      <Header seachFunc={seachFunc} />
      <div className="club">
        <div className="club-banner relative" style={{ backgroundImage: `url(${clubId.data.bannerImageUrl})` }}>
          <div className="club-tag">
            {clubId.data.tags.map((tag, index) => {
              return (
                <div className="club-tag-item" key={index}>
                  {tag.name}
                </div>
              );
            })}
          </div>
          <div className="club-profile">
            <img src={clubId.data.profileImageUrl} alt="" />
          </div>
        </div>
        <div className="club-content">
          <div className="club">
            <div className="club-content-title">
              {clubId.data.name}
              <div className="manager">
                <div className="manager-tag flex-center">manager</div>
                {clubId.data.master.username}
              </div>
            </div>
            <div className="club-content-explan">{clubId.data.description}</div>
            <div className="flex-between">
              <div className="club-content-info">
                <div className="club-content-info-box">
                  <div className="club-content-info-number">{clubId.data.memberCount}</div>
                  <div className="club-content-info-title">Memeber</div>
                </div>
                <div className="club-content-info-box">
                  <div className="club-content-info-number">{clubId.data.postCount}</div>
                  <div className="club-content-info-title">Post</div>
                </div>
                <div className="club-content-info-box">
                  <div className="club-content-info-number">{clubId.data.pinCount}</div>
                  <div className="club-content-info-title">Pin Clip</div>
                </div>
              </div>
              <div className="club-icon-btn">
                <div className="item flex-center" onClick={() => setOpenPopup(!openPopup)}>
                  <img src={require(`images/club/rank.png`)} alt="" />
                </div>
                <div className="item flex-center" onClick={() => setBookmark(!bookmark)}>
                  <img
                    src={require(bookmark ? `images/club/club-bookmark.png` : `images/club/icon-bookmark-line.png`)}
                    alt=""
                  />
                </div>
                {clubId.data.profile ? '' : <Button label={'Join'} size="m" />}
              </div>
            </div>
          </div>
        </div>
        <hr className="club-hr" />

        <div className="club-tap">
          {clubId.data.boardGroups.map((item, index) => {
            return (
              <div
                className={'club-tap-item ' + (boardGrop[3] === item.name ? 'active' : '')}
                onClick={() => navigate(item.name)}
                key={index}
              >
                {item.name}
              </div>
            );
          })}
        </div>

        <Outlet context={clubId} />
      </div>

      <SharePopup open={openPopup} setOpen={setOpenPopup} />
    </div>
  );
}

export default Club;
