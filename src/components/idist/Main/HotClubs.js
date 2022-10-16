/* eslint-disable */

import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

function HotClubs(props) {
  const navigate = useNavigate();

  const [hotCategories, setHotCategories] = useState([]);
  const [selectCategories, setSelectCategories] = useState('');
  const [hotClubData, setHotClubData] = useState([]);

  useEffect(() => {
    setHotClubData([...props.clubsData]);
    setHotCategories([...props.categoriesData]);
  }, [props.clubsData, props.categoriesData]);

  return (
    <div className="home-box hot-clubs">
      <div className="see-all" onClick={() => navigate(`/clubs/search/clubs`)}>
        See all
      </div>
      <div className="flex-between">
        <div className="clubs-title">Hot Clubs</div>
        <div className="categories">
          <div
            className={'item flex-center ' + (selectCategories === '' ? 'active' : '')}
            onClick={() => setSelectCategories('')}
          >
            All
          </div>
          {hotCategories.map((item, index) => {
            if (index < 5) {
              return (
                <div
                  className={'item flex-center ' + (selectCategories === item.id ? 'active' : '')}
                  key={index}
                  onClick={() => setSelectCategories(item.id)}
                >
                  {item.title}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="content">
        {hotClubData
          .filter((todo) => {
            if (selectCategories !== '' && todo.category === selectCategories) {
              return true;
            } else if (selectCategories === '') {
              return true;
            }
          })
          .map((clubItem, clubIndex) => {
            if (clubIndex < 8)
              return (
                <div
                  className="club-list relative"
                  key={clubIndex}
                  onClick={() => navigate(`/club/${clubItem.id}/home`)}
                >
                  <div className="list-img">
                    <img
                      src={
                        clubItem.thumbnail_image_url
                          ? clubItem.thumbnail_image_url
                          : require('images/club/club-dummy.png')
                      }
                      alt=""
                    />
                  </div>
                  <div className="list-item-profile-image">
                    <img
                      src={
                        clubItem.master.profile_image_url
                          ? clubItem.master.profile_image_url
                          : require('images/club/profile-dummy.png')
                      }
                    />
                  </div>
                  <div className="list-item">
                    <div className="list-item-name">{clubItem.title}</div>
                    <div className="flex-between">
                      <div className="list-item-info">
                        <div>
                          <img src={require('images/main/icon-user.png')} />
                        </div>
                        <div>{clubItem.member_count} M Sliver</div>
                      </div>
                      <div className="list-item-pin" onClick={() => props.handleClickPin(clubItem.is_pin)}>
                        <img
                          src={require(clubItem.pin
                            ? clubItem.is_pin
                              ? `images/club/club-bookmark.png`
                              : `images/club/club-bookmark-line.png`
                            : `images/club/club-bookmark-line.png`)}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
          })}
      </div>
    </div>
  );
}

export default HotClubs;
