/* eslint-disable */

import React, { useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';

import Profile from 'components/idist/Profile';
import ClubHomePosts from 'components/idist/Club/home/ClubHomePosts';
import ClubHomeGalleries from 'components/idist/Club/home/ClubHomeGalleries';
import ClubHomeEvent from '../../components/idist/Club/home/ClubHomeEvent';
import SideMember from './SideMember';
import Notion from './Notion';

function Home() {
  const clubId = useOutletContext();

  return (
    <div className="club-home container">
      <div className="item">
        <div>
          <ClubHomeEvent />
        </div>
        <div>
          <ClubHomePosts />
        </div>
        <div>
          <ClubHomeGalleries />
        </div>
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}
        <div className="chatting">
          <img src={require(`../../images/main/chatting.png`)} alt="" />
        </div>
        <Notion />

        <SideMember />
      </div>
    </div>
  );
}

export default Home;
