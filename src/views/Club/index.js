/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubInit, postClubPinInit, postClubUnpinInit, postClubShareInit } from 'redux/idistStore/clubSlice';
import { useParams } from 'react-router';
import { useNavigate, Outlet } from 'react-router-dom';
import { Header } from 'components/idist/Header';
import { Loader } from 'components/idist/Loader';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import SharePopup from 'components/idist/popup/SharePopup';

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
  }, [dispatch]);

  const seachFunc = () => {
    navigate('/clubs/search/all');
  };

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
        if (item.name === board_group) {
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
    <div id="root">
      <Header seachFunc={seachFunc} />

      <div className="club">
        <div className="club-banner relative" style={{ backgroundImage: `url(${clubId.data.banner_image_url})` }}>
          <div className="club-tag">
            {clubId.data.tags.map((tag, index) => {
              return (
                <div className="club-tag-item" key={index}>
                  {tag.name}
                </div>
              );
            })}
          </div>
        </div>
        <div className="main">
          {pamename.indexOf('home') > -1 && (
            <div className="club-content flex-between">
              <div className="club-info">
                <div className="club-content-title">
                  {clubId.data.name}
                  <div className="manager">
                    <div className="manager-tag flex-center">manager</div>
                    {clubId.data.master.username}
                  </div>
                </div>
                <div className="club-content-description">{clubId.data.description}</div>
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
                      <div className="club-content-info-number">{clubId.data.pin_count}</div>
                      <div className="club-content-info-title">Pin Clip</div>
                    </div>
                  </div>
                  <div className="club-icon-btn">
                    <div className="item flex-center" onClick={() => setOpenPopup(!openPopup)}>
                      <img src={require(`images/club/rank.png`)} alt="" />
                    </div>
                    <div className="item flex-center" onClick={() => handleClickPin(clubId.data.is_pin)}>
                      <img
                        src={require(clubId.data.pin
                          ? clubId.data.is_pin
                            ? `images/club/club-bookmark.png`
                            : `images/club/icon-bookmark-line.png`
                          : `images/club/icon-bookmark-line.png`)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="club-profile">
                <img
                  src={
                    clubId.data.profile_image_url
                      ? clubId.data.profile_image_url
                      : require('images/main/temporary-profile.png')
                  }
                  alt=""
                />
              </div>
            </div>
          )}
          <div className="club-boardGroup">
            <div
              className={'club-boardGroup-item ' + (board_group === 'home' ? 'active' : '')}
              // onClick={() => clickboardGroup('', 'home')}
              onMouseOver={() => clickboardGroup('', 'home')}
            >
              Home
            </div>
            {clubId.data.board_groups.map((item, index) => {
              return (
                <div
                  className={'club-boardGroup-item ' + ((board_group === item.name) & openBorad ? 'active' : '')}
                  // onClick={() => clickboardGroup(item.boards, item.name)}
                  // onMouseLeave={() => clickboardGroup(item.boards, item.name)}
                  onMouseOver={() => clickboardGroup(item.boards, item.name)}
                  key={index}
                >
                  {item.name}
                </div>
              );
            })}
          </div>

          <div className="club-board" style={{ display: openBorad ? 'flex' : 'none' }}>
            <div className="club-board-list">
              {ArrBorad.map((boards, index) => {
                return (
                  <div
                    className={'club-board-list-item ' + (board == boards.name ? 'active' : '')}
                    key={index}
                    onClick={() => clickboard(boards.id, boards.name)}
                  >
                    {boards.name}
                  </div>
                );
              })}
            </div>
          </div>

          <Outlet context={clubId} />
        </div>
      </div>
      <SharePopup open={openPopup} setOpen={setOpenPopup} sharefuc={handleClickShare} />
    </div>
  );
}

export default Club;
