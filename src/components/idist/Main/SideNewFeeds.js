/* eslint-disable */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function MyFeeds() {
  const navigate = useNavigate();
  return (
    <div className="side-box myFeeds">
      <div className="flex-between">
        <div className="side-box-title">New Feeds</div>
        <div className="see-all" onClick={() => navigate('/clubs/newfeeds')}>
          See all
        </div>
      </div>
      <div className="side-box-meun">
        <div className="myFeeds-content">
          {[...Array(6)].map((n, index) => (
            <div className="myFeeds-list" key={index}>
              <div className="myFeeds-list-item">
                <div className="myFeeds-list-item-name">작성자</div>
                <div className="myFeeds-list-item-title">새로운피드입니다.</div>
                <div className="myFeeds-list-item-content">
                  Lorem ipsum dolor sit amet, consect eturelit, sed do eiusmod temporinc ...
                </div>
                <div className="myFeeds-list-item-info">
                  <img src={require('images/main/icon-user.png')} />
                  2.5M Gold
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyFeeds;
