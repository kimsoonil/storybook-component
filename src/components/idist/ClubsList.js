/* eslint-disable */

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubsInit, getMoreClubsInit } from 'redux/idistStore/clubSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';

import 'assets/scss/search.scss';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';

function ClubsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { clubs, clubList } = useSelector((state) => state.club);
  const { isLoading, list } = useSelector((state) => state.categories);
  const [selectCategories, setSelectCategories] = useState('');
  const [scrollEvent, setScrollEvent] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const limit = props.limit;
  const search = searchParams.get('search');
  const parameters = {
    search: search,
    category: selectCategories,
    page_size: limit
  };

  useEffect(() => {
    dispatch(getClubsInit({ parameters: parameters }));
    dispatch(categoriesInit());
  }, [dispatch, searchParams, selectCategories]);

  useEffect(() => {
    setScrollEvent(clubs.count !== clubList.length);
  }, [clubs.count, clubList]);

  useEffect(() => {
    if (isBottom) {
      dispatch(getMoreClubsInit({ parameters: parameters }));

      setIsBottom(false);
    }
  }, [isBottom, clubList, dispatch, setIsBottom]);

  function handleUserScroll() {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + window.innerHeight + 50 >= scrollHeight) {
      setIsBottom(true);
    }
  }
  useEffect(() => {
    if (props.searchTab !== 'clubs') return;
    window.addEventListener('scroll', handleUserScroll);
    return () => window.removeEventListener('scroll', handleUserScroll);
  }, []);

  if (clubs.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="search-club">
      <div className="flex-between">
        <div className="search-club-title flex-center"> {clubs.count} Clubs</div>
        <div className="list-filter flex-center">
          <div className="flex-center active">Hot</div>
          <div className="flex-center">Popular</div>
          <div className="flex-center">New</div>
        </div>
      </div>
      <div className="categories">
        <div
          className={'item flex-center ' + (selectCategories === '' ? 'active' : '')}
          onClick={() => setSelectCategories('')}
        >
          All
        </div>
        {!isLoading ? (
          list.map((item, index) => {
            if (index < 11) {
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
          })
        ) : (
          <div className="flex-center">
            <Loader />
          </div>
        )}
      </div>
      <div className="content">
        {clubList.map((clubItem, index) => {
          return (
            <div className="club-list relative" key={index} onClick={() => navigate(`/club/${clubItem.id}/home`)}>
              <div className="list-img">
                <img
                  src={
                    clubItem.thumbnail_image_url ? clubItem.thumbnail_image_url : require('images/club/club-dummy.png')
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
                  <div className="list-item-pin">
                    {clubItem.pin === null ? (
                      <img src={require('images/club/club-bookmark-line.png')} />
                    ) : clubItem.is_pin ? (
                      <img src={require('images/club/club-bookmark.png')} />
                    ) : (
                      <img src={require('images/club/club-bookmark-line.png')} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {props.searchTab === 'clubs' ? (
        clubs.count === clubList.length ? (
          <div></div>
        ) : (
          <div className="flex-center">
            <Loader />
          </div>
        )
      ) : (
        <div className="flex-center">
          <Button
            size="l"
            label={'More'}
            width={116}
            onClick={() => {
              navigate('/clubs/search/clubs');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ClubsList;
