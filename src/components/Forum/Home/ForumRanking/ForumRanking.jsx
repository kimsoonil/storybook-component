import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { reqForumBest } from 'redux/store/forum/forumBestSlice';
import RankingSlide from './RankingSlide';
import ForumDetail from './ForumDetail';

function ForumRanking() {
  const menu = [
    { id: 'BEST_LIVE', txt: 'Live' },
    { id: 'BEST_WEEKLY', txt: 'Weekly' },
    { id: 'BEST_MONTHLY', txt: 'Monthly' }
  ];

  // BEST_LIVE
  // BEST_WEEKLY
  // BEST_MONTHLY
  // BEST_RISING
  const [reqOption, setReqOption] = useState({ best_forum_type: '' });
  const { bestList } = useSelector((state) => ({ ...state.forumBest }));

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(reqOption);
  //   dispatch(reqForumBest(reqOption));
  // }, [reqOption]);

  return (
    <div className="forum_ranking">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Forum Ranking</h4>
        <div className="title_menu">
          {menu.map((item) => (
            <button
              type="button"
              className={classNames({ active: item.id === reqOption.sort }, 'text_btn')}
              key={item.id}
              onClick={() => setReqOption({ ...reqOption, sort: item.id })}
            >
              <span id={item.id} onClick={(e) => setReqOption({ ...reqOption, sort: e.target.id })} aria-hidden="true">
                {item.txt}
              </span>
            </button>
          ))}
        </div>
        {/* <div className="forum_swiper">
        <div className="swiper">
          <div className="swiper_img">
            <RankingSlide>
              {list.map((item) => (
                <ForumDetail info={item} key={item.forumId} />
              ))}
            </RankingSlide>
          </div>
        </div>
      </div> */}
      </div>
      <div className="forum_swiper">
        <RankingSlide>
          {bestList.map((item) => (
            <div className="slick-slider" key={item.id}>
              <button type="button" className="swiper_button left">
                <span className="a11y">좌측으로</span>
              </button>
              <div className="slick-list">
                <div className="slick-track">
                  <div className="slick-slide">
                    <ForumDetail info={item} key={item.id} />
                  </div>
                </div>
              </div>
              {/* <button type="button" className="swiper_button right">
              <span className="a11y">우측으로</span>
            </button> */}
            </div>
          ))}
        </RankingSlide>
      </div>
    </div>
  );
}

export default ForumRanking;
