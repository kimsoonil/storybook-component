/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubInit } from 'redux/idistStore/clubSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Pagination from 'components/idist/Pagination';

import 'assets/scss/search.scss';
import { Button } from 'components/idist/Button';
import { Loader } from 'components/idist/Loader';

function ClubsList(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const clubState = useSelector((state) => state.club);
  const [page, setPage] = useState(1);
  const limit = props.limit;
  const offset = (page - 1) * limit;

  useEffect(() => {
    let parameter = '';
    if (searchParams.get('search') !== null) {
      parameter = searchParams.get('search');
    }
    dispatch(getClubInit(parameter));
  }, [dispatch, searchParams]);

  const { isLoading, clubs } = clubState;

  if (clubs.message !== 'ok')
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  return (
    <div className="search-club">
      <div className="flex-between">
        <div className="search-club-title"> {clubs.data.length} Clubs</div>
        <div className="list-filter flex-center">
          <div className="flex-center active">Hot</div>
          <div className="flex-center">Popular</div>
          <div className="flex-center">New</div>
        </div>
      </div>
      <div className="search-club-tab">
        <div className="item active flex-center">All</div>
        <div className="item flex-center">Game</div>
        <div className="item flex-center">NFT</div>
        <div className="item flex-center">Sports</div>
        <div className="item flex-center">Stoak</div>
        <div className="item flex-center">Fan Club</div>
        <div className="item flex-center">Social</div>
        <div className="item flex-center">Traveling</div>
        <div className="item flex-center">Animals</div>
      </div>
      <div className="search-club-list">
        {clubs.data.slice(offset, offset + limit).map((clubItem, index) => {
          return (
            <div
              className="search-club-list-item relative"
              key={index}
              onClick={() => {
                navigate(`/club/${clubItem.id}/Home`);
              }}
            >
              <div className="search-club-item-img ">
                <div className="super-icon flex-center">★</div>
                <img src={clubItem.thumbnailImageUrl} alt="" />
              </div>
              <div className="search-club-list-item-content">
                <div className="search-club-list-item-name">{clubItem.name}</div>
                <div className="search-club-list-item-info">Members {clubItem.memberCount} ・ sliver</div>
                <div className="bookmark flex-center">
                  <img src={require(`images/search/icon-bookmarks.png`)} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {props.searchTab === 'clubs' ? (
        <div className="flex-center">
          <Pagination total={clubs.data.length} limit={limit} page={page} setPage={setPage} />
        </div>
      ) : (
        <div className="flex-center">
          <Button
            size="l"
            label={'More'}
            width={116}
            onClick={() => {
              navigate('/search/clubs');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ClubsList;
