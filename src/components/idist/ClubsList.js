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
  const { clubs, clubList, moreLoading } = useSelector((state) => state.club);
  const { isLoading, list } = useSelector((state) => state.categories);
  const [selectCategories, setSelectCategories] = useState('');
  const [scrollEvent, setScrollEvent] = useState(true);
  const [isBottom, setIsBottom] = useState(false);
  const limit = props.limit;
  const search = searchParams.get('search');
  const parameters = {
    search: search,
    club_category: selectCategories,
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
    if (isBottom && !moreLoading) {
      dispatch(getMoreClubsInit({ parameters: parameters }));

      setIsBottom(false);
    }
  }, [isBottom, clubList, dispatch, setIsBottom, moreLoading]);

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
            if (index < 10) {
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
        {clubList.length > 0 ? (
          clubList.map((clubItem, index) => {
            return (
              <div className="club-list relative" key={index} onClick={() => navigate(`/club/${clubItem.id}/home`)}>
                <div className="list-img">
                  <img
                    src={
                      clubItem.profile_image_url ? clubItem.profile_image_url : require('images/club/club-dummy.png')
                    }
                    alt=""
                  />
                </div>
                <div className="list-item-profile-image">
                  <img
                    src={
                      clubItem.profile_image_url ? clubItem.profile_image_url : require('images/club/profile-dummy.png')
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
                      ) : clubItem.is_pined ? (
                        <img src={require('images/club/club-bookmark.png')} />
                      ) : (
                        <img src={require('images/club/club-bookmark-line.png')} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-data flex-center">
            <div>
              <img src={require('images/Error/img_error_page.png')} alt="" />
            </div>
            <div className="no-data-title">No search results found</div>
            <div className="no-data-content">Try searching with a different keyword.</div>
          </div>
        )}
      </div>

      {props.searchTab === 'clubs' ? (
        clubs.count === clubList.length || clubList.length <= 0 ? (
          <div></div>
        ) : (
          <div className="flex-center">
            <Loader />
          </div>
        )
      ) : clubs.count > 20 ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ClubsList;
