/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getClubInit } from 'redux/store/clubSlice';
import { useNavigate } from 'react-router-dom';
import Pagination from 'components/Pagination';

import { wholeClubList, postsList } from '../Home/homeDate';
import 'assets/scss/search.scss';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';

function SearchClub(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clubState = useSelector((state) => state.club);
  const [page, setPage] = useState(1);
  const limit = props.limit;
  const offset = (page - 1) * limit;

  useEffect(() => {
    dispatch(getClubInit());
  }, [dispatch, page]);

  const { isLoading, clubs } = clubState;

  if (isLoading || clubs.message !== 'ok') return <Loader />;
  return (
    <div className="search-club">
      <div className="search-club-title"> 2,108 Clubs</div>
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
                navigate(`/club/${clubItem.id}`);
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
                  <img src={require(`../../images/search/icon-bookmarks.png`)} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {props.searchTab === 'Clubs' ? (
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
              props.setSearchTab('Clubs');
            }}
          />
        </div>
      )}
    </div>
  );
}

export default SearchClub;
