/* eslint-disable */

import React, { useState, useEffect } from 'react';

import { useOutletContext } from 'react-router-dom';

import Profile from 'components/idist/Profile';
import ClubHomePosts from 'components/idist/Club/home/ClubHomePosts';
import ClubHomeGalleries from 'components/idist/Club/home/ClubHomeGalleries';
import ClubHomeEvent from 'components/idist/Club/home/ClubHomeEvent';
import SideMember from 'components/idist/Club/SideMember';
import SideNotion from 'components/idist/Club/SideNotion';
import SideSuperClub from 'components/idist/Club/SideSuperClub';

function Home() {
  const clubId = useOutletContext();

  return (
    <div className=" container">
      <div className="item">
        <div>
          <ClubHomeEvent clubId={clubId} />
        </div>
        <div>
          <ClubHomePosts clubId={clubId} />
        </div>
        <div>
          <ClubHomeGalleries clubId={clubId} />
        </div>
      </div>
      <div className="item">
        {clubId.data.user ? <Profile userData={clubId.data} type={'club'} /> : <Profile type={'logout'} />}
        <div className="chatting">
          <img src={require(`../../images/main/chatting.png`)} alt="" />
        </div>
        <SideNotion clubId={clubId} />

        <SideMember />
        <SideSuperClub />
      </div>
    </div>
  );
}

export default Home;
