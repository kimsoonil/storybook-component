/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInit } from 'redux/idistStore/userSlice';
import { useNavigate } from 'react-router-dom';

import { Header } from 'components/idist/Header';
import { myClubList, activityList, wholeClubList } from './homeDate.js';
import 'assets/scss/reset.scss';
import 'assets/scss/main.scss';
import Profile from 'components/idist/Profile.js';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home() {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const seachFunc = () => {
    navigate('/clubs/search/all');
  };
  useEffect(() => {
    dispatch(getUserInit());
  }, [dispatch]);
  const { user, error } = userState;

  return (
    <div className="main">
      <div className="container">
        <div className="item">
          <div className="clubs ">
            <div className="clubs-tab">
              <div className="item active flex-center">All</div>
              <div className="item flex-center">{t('GAME')}</div>
              <div className="item flex-center">NFT</div>
              <div className="item flex-center">Sports</div>
              <div className="item flex-center">Stoak</div>
              <div className="item flex-center">Fandom</div>
              <div className="item flex-center">Cumunity</div>
            </div>
            <div className="content">
              {myClubList.map((clubItem, clubIndex) => {
                return (
                  <div className="club-list" key={clubIndex}>
                    <div className="list-img">
                      <img src={require(`images/main/${clubItem.img}`)} alt="" />
                    </div>
                    <div className="list-item">
                      <div className="list-item-title">{clubItem.title}</div>
                      {clubItem.post.map((postItem, postIndex) => {
                        return (
                          <div className="list-item-post" key={postIndex}>
                            <div className="list-item-post-title">{postItem.title}</div>
                            <div className="list-item-post-period">{postItem.period}</div>
                          </div>
                        );
                      })}

                      <div className="list-item-tab flex-center">{clubItem.tag}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="whole-club">
            <div className="whole-club-title">How About This Clubs?</div>
            <div className="whole-club-about">
              <div className="active whole-club-about-item">Popular</div>
              <div className=" whole-club-about-item">New</div>
              <div className=" whole-club-about-item">Suggest</div>
            </div>
            <div className="whole-club-tab">
              <div className="item active flex-center">All</div>
              <div className="item flex-center">Game</div>
              <div className="item flex-center">NFT</div>
              <div className="item flex-center">Sports</div>
              <div className="item flex-center">Stoak</div>
              <div className="item flex-center">Fandom</div>
              <div className="item flex-center">Cumunity</div>
            </div>
            <div className="whole-club-list">
              {wholeClubList.map((wholeItem, index) => {
                return (
                  <div className="whole-club-item" key={index}>
                    <div className="whole-club-item-img">
                      <img src={require(`../../images/main/${wholeItem.img}`)} alt="" />
                    </div>
                    <div className="whole-club-item-content">
                      <div className={'whole-club-item-category ' + wholeItem.category}>{wholeItem.category}</div>
                      <div className="whole-club-item-name">{wholeItem.name}</div>
                      <div className="whole-club-item-info">
                        Members {wholeItem.members} ・ Like {wholeItem.like}{' '}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div style={{ width: '100%' }}></div>
            </div>
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
            <img src={require(`../../images/main/chatting.png`)} alt="" />
          </div>
          <div className="side-box activity">
            <div className="flex-between">
              <div className="activity-title">Activity</div>
              <div className="activity-category">
                <img src={require('../../images/main/category.png')} alt="" />
              </div>
            </div>
            <div className="activity-meun">
              <div className="flex-center">
                <div className="activity-tap flex-center active">General</div>
                <div className="activity-tap flex-center">Club</div>
              </div>
              <div className="flex-center">
                <select className="activity-select">
                  <option>League of Lenends</option>
                  <option>Animal Crossing: New Horizons</option>
                  <option>Meta Kong’s</option>
                  <option>Super Mario Offical Club</option>
                  <option>Nike Runners</option>
                </select>
              </div>
              <div className="activity-general">
                {activityList.map((activityItem, index) => {
                  return (
                    <div className="activity-item" key={index}>
                      <div className="activity-item-img">
                        <img src={require(`../../images/main/${activityItem.img}`)} />
                      </div>
                      <div className="activity-item-content">
                        <div className="activity-item-name">{activityItem.name}</div>
                        <div className="activity-item-greetings">{activityItem.greetings}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

const TempLinkCompoenet = () => {
  const linkStyle = {
    backgroundColor: '#9013fe',
    border: '2px solid #5a0a9f',
    borderRadius: '6px',
    padding: '12px 16px',
    margin: '10px',
    textDecoration: 'none',
    color: 'white'
  };

  const divStyle = {
    display: 'flex',
    backgroundColor: 'black'
  };

  return (
    <div style={divStyle}>
      <Link style={linkStyle} to={'/create'} children={'create'} />
      <Link style={linkStyle} to={'/manage'} children={'manage'} />
      <Link style={linkStyle} to={'/manage/information'} children={'modify'} />
    </div>
  );
};
