/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubsInit } from 'redux/idistStore/clubSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { categoriesInit } from 'redux/idistStore/admin/categoriesSlice';
import Pagination from 'components/idist/Pagination';
import { useInfinteScroll } from 'hooks/useInfinteScroll';
import 'assets/scss/search.scss';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';

function ClubsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { clubs } = useSelector((state) => state.club);
  const { isLoading, list } = useSelector((state) => state.categories);
  const [selectCategories, setSelectCategories] = useState('');
  const [page, setPage] = useState(1);
  const limit = props.limit;
  const offset = (page - 1) * limit;
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let search = searchParams.get('search');
    const parameters = {
      search: search,
      category: selectCategories,
      page: page,
      page_size: limit
    };

    dispatch(getClubsInit({ parameters: parameters }));
    dispatch(categoriesInit());
  }, [dispatch, searchParams, selectCategories]);

  useInfinteScroll({
    target,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting) {
        const parameters = {
          search: search,
          category: selectCategories,
          page: page + 1,
          page_size: limit
        };
        dispatch(getClubsInit({ parameters: parameters }));
      }
    }
  });

  if (clubs.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="search-club">
      <div className="flex-between">
        <div className="search-club-title flex-center"> {clubs.data.length} Clubs</div>
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
                  {item.name}
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
        {clubs.data.map((clubItem, index) => {
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
                <div className="list-item-name">{clubItem.name}</div>
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
        // <div className="flex-center">
        //   <Pagination total={clubs.data.length} limit={limit} page={page} setPage={setPage} />
        // </div>
        <div ref={setTarget} className="last-item">
          <Loader />
        </div>
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
