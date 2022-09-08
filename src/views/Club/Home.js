/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubMembersInit } from 'redux/store/clubSlice';
import { useParams } from 'react-router';

import { postsList } from '../Home/homeDate';
import { Loader } from 'components/Loader';
import Profile from 'components/Profile';
import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';

function Home(props) {
  const dispatch = useDispatch();
  const clubState = useSelector((state) => state.club);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getClubMembersInit(id));
  }, [dispatch]);

  const { isLoading, members } = clubState;

  return (
    <div className="club-home container">
      <div className="item">
        <div>
          <div className="club-home-title">Post</div>
          <div className="club-list-tag">
            <div className="item active flex-center">Popular</div>
            <div className="item flex-center">NEW</div>
          </div>
          <div className="club-post-list">
            {postsList.map((postsItem, index) => {
              return (
                <div className="club-post-list-item relative" key={index}>
                  <div className="club-post-list-item-container">
                    <div className="club-post-list-item-nick">{postsItem.nickname}</div>
                    <div className="club-post-list-item-title">{postsItem.title}</div>
                    <div className="club-post-list-item-content">{postsItem.content}</div>
                    <div className="club-post-list-item-info">
                      View {postsItem.view} ・ Comment {postsItem.comment} {postsItem.data}
                    </div>
                  </div>
                  <div className="club-post-img ">
                    <img src={require(`../../images/home/${postsItem.img}`)} alt="" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="club-home-title">Gallery</div>
          <div className="club-gallery-list">
            <div className="item">
              <img src={require(`images/club/gallery1.png`)} alt="" />
            </div>
            <div className="item">
              <img src={require(`images/club/gallery2.png`)} alt="" />
            </div>
            <div className="item">
              <img src={require(`images/club/gallery3.png`)} alt="" />
            </div>
            <div className="item">
              <img src={require(`images/club/gallery4.png`)} alt="" />
            </div>
            <div className="item">
              <img src={require(`images/club/gallery1.png`)} alt="" />
            </div>
            <div className="item">
              <img src={require(`images/club/gallery2.png`)} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="item">
        <Profile club={id} />
        <div className="chatting">
          <img src={require(`../../images/home/chatting.png`)} alt="" />
        </div>
        <div className="member">
          <div className="flex-between">
            <div className="member-title">Member</div>
            <div className="member-see">See All</div>
          </div>
          {members.message !== 'ok' ? (
            <div className="root-center">
              <Loader />
            </div>
          ) : (
            <div className="member-list">
              {members.data.map((members, index) => {
                return (
                  <div key={index} className="member-list-item flex-center">
                    <div className="member-list-img">
                      <img src={members.user.profileImageUrl} alt="" />
                    </div>
                    <div className="member-list-name">{members.user.username}</div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
