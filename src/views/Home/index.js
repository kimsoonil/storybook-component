import React, { useState } from 'react';
import { Header } from '../../components/Header';
import '../../assets/scss/reset.scss';
import '../../assets/scss/home.scss';
import { Pageination } from '../../components/Pageination';
import { myClubList, activityList } from './homeDate.js';

function Home() {
  return (
    <div id="root">
      <Header />
      <div className="slideView">
        <img src={require('../../assets/components/slide.png')} alt="" />
      </div>
      <div className="main">
        <div className="container">
          <div className="item">
            <div className="clubs ">
              <div className="clubs-title">
                <div className="item active">My Clubs</div>
                <div className="item">Pined Clubs</div>
                <div className="item">Manage Clubs</div>
              </div>
              <div className="clubs-tab">
                <div className="item active">All</div>
                <div className="item">Game</div>
                <div className="item">NFT</div>
                <div className="item">Sports</div>
                <div className="item">Stoak</div>
                <div className="item">Fandom</div>
                <div className="item">Cumunity</div>
              </div>
              <div className="content">
                {myClubList.map((clubItem, clubIndex) => {
                  return (
                    <div className="club-list" key={clubIndex}>
                      <div className="list-img">
                        <img src={require(`../../assets/components/${clubItem.img}`)} alt="" />
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

                <Pageination numPages={10} />
              </div>
            </div>
          </div>
          <div className="item">
            <div className="side-box profile">
              <div className="profile-img flex-center">
                <img src={require('../../assets/components/profile.png')} alt="" />
                <div className="profile-name">Kate</div>
              </div>
              <div className="flex-center">
                <div className="profile-info flex-center">
                  <div className="profile-info-title">458</div>
                  <div className="profile-info-content">Join</div>
                </div>
                <div className="profile-info flex-center">
                  <div className="profile-info-title">12K</div>
                  <div className="profile-info-content">Posts</div>
                </div>
                <div className="profile-info flex-center">
                  <div className="profile-info-title">1.4K</div>
                  <div className="profile-info-content">Comments</div>
                </div>
              </div>
              <div className="profile-btn flex-between">
                <div>Create Club</div>
                <div>→</div>
              </div>
            </div>
            <div className="side-box activity">
              <div className="flex-between">
                <div className="activity-title">Activity</div>
                <div className="activity-category">
                  <img src={require('../../assets/components/category.png')} alt="" />
                </div>
              </div>
              <div className="activity-meun">
                <div className="flex-center">
                  <div className="activity-tap active">General</div>
                  <div className="activity-tap ">Club</div>
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
                          <img src={require(`../../assets/components/${activityItem.img}`)} />
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
          <div className="item">
            <div className="clubs whole-club">
              <div className="title">How About This Clubs?</div>
              <div className="whole-club-tab">
                <div className="active whole-club-tab-item">Popular</div>
                <div className=" whole-club-tab-item">New</div>
                <div className=" whole-club-tab-item">Suggest</div>
              </div>
              <div className="tab">
                <div className="item active">All</div>
                <div className="item">Game</div>
                <div className="item">NFT</div>
                <div className="item">Sports</div>
                <div className="item">Stoak</div>
                <div className="item">Fandom</div>
                <div className="item">Cumunity</div>
              </div>
              <div className="content">
                <Pageination numPages={10} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
