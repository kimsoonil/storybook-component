/* eslint-disable */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function MainTap(prop) {
  const navigate = useNavigate();
  const pathname = window.location.pathname.split('/');

  const clubsTabArr = [
    { url: '', title: 'Home' },
    { url: 'myclub', title: 'My Clubs' },
    { url: 'newfeeds', title: 'New Feeds' },
    { url: 'activity', title: 'Activity' }
  ];
  return (
    <div className="clubs-tap">
      {clubsTabArr.map((item, index) => {
        if (pathname[2] === undefined) {
          pathname[2] = '';
        }
        return (
          <div
            className={'item ' + (pathname[2] === item.url && 'active')}
            key={index}
            onClick={() => navigate(`/clubs/${item.url}`)}
          >
            {item.title}
          </div>
        );
      })}
    </div>
  );
}

export default MainTap;
