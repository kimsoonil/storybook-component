/* eslint-disable */

import React, { useEffect } from 'react';
import { activityList } from 'views/Main/homeDate.js';

function Activity() {
  return (
    <div className="side-box activity">
      <div className="flex-between">
        <div className="side-box-title">Activity</div>
        <div className="see-all">See all</div>
      </div>
      <div className="side-box-meun">
        <div className="flex-center">
          <div className="side-box-tap flex-center active">General</div>
          <div className="side-box-tap flex-center">Club</div>
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
                  <img src={require(`images/main/${activityItem.img}`)} />
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
  );
}

export default Activity;
