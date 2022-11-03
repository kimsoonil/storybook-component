import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';
import { reqForumRankingList } from 'redux/store/forum/forumRankingListSlice';
import RankingSlide from './RankingSlide';
import ForumDetail from './ForumDetail';
import PostList from './PostList';

function ForumRanking() {
  const menu = [
    { id: 'live', txt: 'Live' },
    { id: 'weekly', txt: 'Weekly' },
    { id: 'monthly', txt: 'Monthly' }
  ];
  const [reqOption, setReqOption] = useState({ period: 'live', page: 1, page_size: 10, ordering: '-popularity' });
  const { forumIdPostList } = useSelector((state) => ({ ...state.forumIdPostList }));
  const { rankingList, firstForumId } = useSelector((state) => ({ ...state.forumRankingList }));
  const slickRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    // slickRef.current.slickGoto(0);
    dispatch(reqForumRankingList(reqOption));
  }, [reqOption]);

  useEffect(() => {
    console.log('firstForumId', firstForumId);
    dispatch(reqForumIdPostList({ forumId: firstForumId }));
  }, [firstForumId]);

  return (
    <div className="forum_ranking">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Forum Ranking</h4>
        <div className="title_menu">
          {menu.map((item) => (
            <button
              type="button"
              className={classNames({ active: item.id === reqOption.period }, 'text_btn')}
              key={item.id}
              onClick={() => {
                setReqOption({ ...reqOption, period: item.id });
              }}
            >
              <span
                id={item.id}
                onClick={(e) => {
                  setReqOption({ ...reqOption, period: e.target.id });
                }}
                aria-hidden="true"
              >
                {item.txt}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="swiper">
        <div className="forum_swiper">
          <RankingSlide slideCount={3} slickRef={slickRef} reqOption={reqOption}>
            {rankingList.map((item, idx) => (
              <div className="slick-slider" key={item.id}>
                <div className="slick-list">
                  <div className="slick-track">
                    <div className="slick-slide">
                      <ForumDetail info={item} key={item.id} idx={idx} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </RankingSlide>
        </div>
      </div>
      {forumIdPostList?.length > 0 && <PostList info={forumIdPostList} />}
    </div>
  );
}

export default ForumRanking;
