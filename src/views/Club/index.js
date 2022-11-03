/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubInit, postClubPinInit, postClubUnpinInit, postClubShareInit } from 'redux/idistStore/clubSlice';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useParams } from 'react-router';
import { useNavigate, Outlet } from 'react-router-dom';
import ScrollTopBtn from 'components/common/ScrollTopBtn';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import { Loader } from 'components/idist/Loader';
import SharePopup from 'components/idist/popup/SharePopup';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import clubBanner from 'images/club/club-banner.png';

function Club() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clubId, error } = useSelector((state) => state.club);
  const pamename = window.location.pathname;
  const { id } = useParams();

  const [openPopup, setOpenPopup] = useState(false);
  const [boardGroup, setBoradGroup] = useState('home');
  const [ArrBorad, setArrBorad] = useState([]);
  const [openBorad, setOpenBorad] = useState(false);
  const board = localStorage.getItem('board');
  const board_group = localStorage.getItem('boardGroup');

  useEffect(() => {
    dispatch(getClubInit({ id: id }));
    dispatch(getUserInit());
  }, []);

  useEffect(() => {
    if (error.indexOf(403) > -1) {
      alert('로그인을 한 후 이용해주세요');
      navigate('/clubs');
    }
  }, [error]);

  useEffect(() => {
    if (board !== null && board !== '') {
      setOpenBorad(true);
    }
  }, [board]);

  useEffect(() => {
    if (board_group !== null && board_group !== '' && clubId.data !== undefined) {
      clubId.data.board_groups.map((item, index) => {
        if (item.title === board_group) {
          console.log('item', item);
          setArrBorad([...item.boards]);
        }
      });
    }
  }, [board_group, clubId.data]);

  useEffect(() => {
    if (pamename.indexOf('home') > -1) {
      localStorage.setItem('boardGroup', 'home');
      setOpenBorad(false);
    }
  }, [pamename]);

  const handleClickPin = (pin) => {
    if (pin) {
      dispatch(postClubUnpinInit({ id: id, actionList: [{ type: getClubInit.type, payload: { id: id } }] }));
    } else {
      dispatch(postClubPinInit({ id: id, actionList: [{ type: getClubInit.type, payload: { id: id } }] }));
    }
  };

  const clickboardGroup = (boards, name) => {
    if (name === 'home') {
      setOpenBorad(false);
      localStorage.setItem('boardGroup', name);
      localStorage.setItem('board', '');
      navigate(`/club/${id}/home`);
      return false;
    }

    if (name === boardGroup) {
      setOpenBorad(!openBorad);
    } else {
      setOpenBorad(true);
    }
    setBoradGroup(name);
    localStorage.setItem('boardGroup', name);
    setArrBorad([...boards]);
  };
  const clickboard = (id, name) => {
    navigate(`board/${id}`);
    localStorage.setItem('board', name);
  };
  const handleClickShare = (link) => {
    dispatch(postClubShareInit({ id: id, parameters: { link: link } }));
  };

  if (clubId.message !== 'ok')
    return (
      <div className="root-center">
        <Loader />
      </div>
    );
  return (
    <div>
      <Header />

      <div className="club">
        <div className="main">
          <div className="relative">
            <div
              className="club-banner relative"
              style={{
                backgroundImage: clubId.data.banner_image_url
                  ? `url(${clubId.data.banner_image_url})`
                  : `url(${clubBanner})`
              }}
            >
              {/* <div className="club-tag">
                {clubId.data.tags.map((tag, index) => {
                  return (
                    <div className="club-tag-item" key={index}>
                      {tag.title}
                    </div>
                  );
                })}
              </div> */}
            </div>
            <div className="club-content flex-center">
              <div className="club-content-explan">
                <div className="club-content-info">
                  <div className="club-content-info-box" onClick={() => navigate('./member')}>
                    <div className="club-content-info-number">{clubId.data.member_count}</div>
                    <div className="club-content-info-title">Member</div>
                  </div>
                  <div
                    className="club-content-info-box"
                    onClick={() =>
                      navigate(`/club/${clubId.data.id}/board/${clubId.data.board_groups[0].boards[0].id}`)
                    }
                  >
                    <div className="club-content-info-number">{clubId.data.post_count}</div>
                    <div className="club-content-info-title">Post</div>
                  </div>
                  <div className="club-content-info-box" onClick={() => navigate('./superclub')}>
                    <div className="club-content-info-number">0</div>
                    <div className="club-content-info-title">Clubs</div>
                  </div>
                </div>
              </div>
              <div className="club-info">
                <div className="club-content-title">{clubId.data.title}</div>
                <div className="club-content-description">{clubId.data.description}</div>
              </div>
              <div className="club-icon-btn">
                <div className="item flex-center" onClick={() => setOpenPopup(!openPopup)}>
                  <img src={require(`images/club/rank.png`)} alt="" />
                </div>
                <div className="item flex-center" onClick={() => handleClickPin(clubId.data.is_pined)}>
                  <img
                    src={require(clubId.data.is_pined
                      ? clubId.data.is_pined
                        ? `images/club/club-bookmark.png`
                        : `images/club/icon-bookmark-line.png`
                      : `images/club/icon-bookmark-line.png`)}
                    alt=""
                  />
                </div>
              </div>
              <div className="club-profile">
                <img
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = require('images/club/club-profile.png');
                  }}
                  src={
                    clubId?.data?.profile_image_url
                      ? clubId?.data?.profile_image_url
                      : require('images/club/club-profile.png')
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="club-boardGroup">
            <div
              className={'club-boardGroup-item ' + (board_group === 'home' ? 'active' : '')}
              onClick={() => clickboardGroup('', 'home')}
              // onMouseOver={() => clickboardGroup('', 'home')}
            >
              Home
            </div>
            {clubId.data.board_groups.map((item, index) => {
              return (
                <div
                  className={'club-boardGroup-item ' + ((board_group === item.title) & openBorad ? 'active' : '')}
                  // onClick={() => clickboardGroup(item.boards, item.title)}
                  onMouseOver={() => clickboardGroup(item.boards, item.title)}
                  key={index}
                >
                  {item.title}
                </div>
              );
            })}
          </div>

          <div className="club-board" style={{ display: openBorad ? 'flex' : 'none' }}>
            <div className="club-board-list">
              {ArrBorad.map((boards, index) => {
                return (
                  <div
                    className={'club-board-list-item ' + (board == boards.title ? 'active' : '')}
                    key={index}
                    onClick={() => clickboard(boards.id, boards.title)}
                  >
                    {boards.title}
                  </div>
                );
              })}
            </div>
          </div>

          <Outlet context={clubId} />
        </div>
      </div>
      <ScrollTopBtn />
      <Footer />
      <SharePopup open={openPopup} setOpen={setOpenPopup} sharefuc={handleClickShare} />
    </div>
  );
}

export default Club;
