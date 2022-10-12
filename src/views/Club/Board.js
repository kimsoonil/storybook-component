/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBoardPostsInit } from 'redux/idistStore/boardSlice';
import { useParams } from 'react-router';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import { getBoardInit } from 'redux/idistStore/boardSlice';
import { Loader } from 'components/idist/Loader';
import Profile from 'components/idist/Profile';
import BoardAlbum from 'components/idist/Club/BoardAlbum';
import BoardList from 'components/idist/Club/BoardList';
import BoardCard from 'components/idist/Club/BoardCard';

import 'assets/scss/club.scss';
import 'assets/scss/reset.scss';
import { Fliter } from 'components/idist/Fliter';
import ToggleBtn from 'components/idist/ToggleBtn';
import SideMember from './SideMember';

function Basic(props) {
  const [postsState, setPostsState] = useState('LIST_TYPE');
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const boardState = useSelector((state) => state.board);
  const { id, boardId } = useParams();
  const clubId = useOutletContext();

  useEffect(() => {
    let parameter = '';
    if (searchParams.get('search') !== null) {
      parameter = searchParams.get('search');
    }
    dispatch(getBoardPostsInit({ id: boardId, data: '' }));
    dispatch(getBoardInit({ id: boardId }));
  }, [boardId]);

  useEffect(() => {
    setPostsState(boardState?.board?.data?.view_mode);
  }, [boardState]);

  const { board, posts } = boardState;
  if (board.message !== 'ok') {
    return (
      <div className="flex-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="club-home container">
      <div className="item">
        <div className="club-home-content ">
          <div className="flex-between">
            <div>
              <div className="club-home-title">{board.data.name}</div>
              <div className="club-home-description">{board.data?.description}</div>
            </div>
            <div className="flex-center  relative">
              <input type="text" className="post-fliter" />
              <div className="fliter-icon " onClick={() => setOpenFilter(!openFilter)}>
                <img src={require(`images/club/icon-fliter.png`)} alt="" />
              </div>
              <div className="fliter-position" style={{ display: openFilter ? 'flex' : 'none' }}>
                <Fliter doneFuc={() => setOpenFilter(!openFilter)} />
              </div>
            </div>
          </div>
          <div className="flex-between">
            <div className="club-list-tag">
              <div className="list-filter flex-center">
                <div className="flex-center active">Hot</div>
                <div className="flex-center">Popular</div>
                <div className="flex-center">New</div>
              </div>
            </div>
            <div className="flex-center">
              <div className="feed">
                My feed
                <ToggleBtn id={'myFeed'} />
              </div>

              <div className="board-state">
                <div
                  className={'album ' + (postsState === 'ALBUM_TYPE' && 'active')}
                  onClick={() => {
                    setPostsState('ALBUM_TYPE');
                  }}
                ></div>
                <div
                  className={'list ' + (postsState === 'LIST_TYPE' && 'active')}
                  onClick={() => {
                    setPostsState('LIST_TYPE');
                  }}
                ></div>
                <div
                  className={'card ' + (postsState === 'CARD_TYPE' && 'active')}
                  onClick={() => {
                    setPostsState('CARD_TYPE');
                  }}
                ></div>
              </div>
            </div>
          </div>

          {postsState === 'ALBUM_TYPE' && <BoardAlbum DataList={posts?.data} />}
          {postsState === 'LIST_TYPE' && <BoardList DataList={posts?.data} />}
          {postsState === 'CARD_TYPE' && <BoardCard DataList={posts?.data} />}
        </div>
      </div>
      <div className="item">
        {clubId.data.profile ? <Profile userData={clubId.data.profile} type={'club'} /> : <Profile type={'logout'} />}
        <div>
          <div className="club-home-content hotPosts">
            <div className="flex-between">
              <div className="side-box-title">Hot Posts</div>
              <div className="see-all">See all</div>
            </div>
            <div className="hotPosts-content">
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
              <div className="hotPosts-content-list flex-between">
                <div className="">
                  <div className="hotPosts-content-name">작성자</div>
                  <div className="hotPosts-content-title">포스트 제목입니다.</div>
                  <div className="hotPosts-content-info">
                    <img src={require('images/main/icon-view.png')} />
                    2.5M 53age
                  </div>
                </div>
                <div>
                  <img src={require('images/club/BTC.png')} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <SideMember />
      </div>
    </div>
  );
}

export default Basic;
