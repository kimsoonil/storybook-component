import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { reqPostRankingList } from 'redux/store/forum/postRankingListSlice';
import ResponsiveSlider from 'components/common/Slider/ResponsiveSlider';
import SimplePost from './SimplePost';

function PostRanking() {
  const menu = [
    { id: 'live', txt: 'Live' },
    { id: 'week', txt: 'Weekly' },
    { id: 'mon', txt: 'Monthly' }
  ];
  const categoy = [
    { id: 'all', txt: 'ALL' },
    { id: 'gam', txt: 'Game' },
    { id: 'cel', txt: 'Celebrity' },
    { id: 'spo', txt: 'Sports' },
    { id: 'tra', txt: 'Travel' },
    { id: 'foo', txt: 'Food' },
    { id: 'ani', txt: 'Animal' },
    { id: 'hob', txt: 'Hobby' },
    { id: 'lif', txt: 'Life' }
  ];

  const { list } = useSelector((state) => ({ ...state.postRankingList }));
  const [reqOption, setReqOption] = useState({ category: 'all', sort: 'live' });
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(reqOption);
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
              className={classNames({ active: item.id === reqOption.sort }, 'text_btn')}
              key={item.id}
            >
              <span
                key={item.id}
                id={item.id}
                onClick={(e) => setReqOption({ ...reqOption, sort: e.target.id })}
                aria-hidden="true"
              >
                {item.txt}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="nav_category">
        {/* <div className="btn_move left">
          <button type="button" className="btn_post_category left">
            <span className="a11y">왼쪽으로 이동</span>
          </button>
        </div> */}
        <div className="btn_category">
          <ResponsiveSlider>
            {categoy.map((item) => (
              <button
                type="button"
                className="post_categoty"
                key={item.id}
                id={item.id}
                onClick={(e) => setReqOption({ ...reqOption, category: e.target.id })}
              >
                <span key={item.id}>{item.txt}</span>
              </button>
            ))}
          </ResponsiveSlider>
        </div>
        <div className="btn_move right">
          <button type="button" className="btn_post_category right">
            <span className="a11y">오른쪽으로 이동</span>
          </button>
        </div>
      </div>
      <ul className="ranking_list">
        {list?.map((item) => (
          <SimplePost item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default PostRanking;
