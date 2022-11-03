import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { reqPostRankingList } from 'redux/store/forum/postRankingListSlice';
import ResponsiveSlider from 'components/common/Slider/ResponsiveSlider';
import SimplePost from './SimplePost';

function PostRanking() {
  const menu = [
    { id: 'live', txt: 'Live' },
    { id: 'weekly', txt: 'Weekly' },
    { id: 'monthly', txt: 'Monthly' }
  ];
  const { postList } = useSelector((state) => ({ ...state.postRankingList }));
  const { catList } = useSelector((state) => ({ ...state.categoryList }));
  const [reqOption, setReqOption] = useState({ forum_category: 1, period: 'live', page_size: 10 });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqPostRankingList(reqOption));
  }, [reqOption]);
  return (
    <div className="post_ranking">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Post Ranking</h4>
        <div className="title_menu">
          {menu.map((item) => (
            <button
              type="button"
              className={classNames({ active: item.id === reqOption.period }, 'text_btn')}
              key={item.id}
            >
              <span
                key={item.id}
                id={item.id}
                onClick={(e) => setReqOption({ ...reqOption, period: e.target.id })}
                aria-hidden="true"
              >
                {item.txt}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="nav_category">
        <div className="btn_category">
          <ResponsiveSlider>
            <button
              type="button"
              className="post_categoty"
              onClick={() => setReqOption({ ...reqOption, forum_category: '' })}
            >
              <span>All</span>
            </button>
            {catList.map((item) => (
              <button
                type="button"
                className="post_categoty"
                key={item.id}
                id={item.id}
                onClick={() => setReqOption({ ...reqOption, forum_category: item.id })}
              >
                <span key={item.id}>{item.title}</span>
              </button>
            ))}
          </ResponsiveSlider>
        </div>
      </div>
      <ul className="ranking_list">
        {postList?.map((item, idx) => (
          <SimplePost item={item} key={item.id} idx={idx} />
        ))}
      </ul>
    </div>
  );
}

export default PostRanking;
