import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { reqPostRankingList } from 'redux/store/forum/postRankingListSlice';
import ResponsiveSlider from 'components/common/Slider/ResponsiveSlider';

function PostSearch2() {
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

  const [reqOption, setReqOption] = useState({ category: 'all', sort: 'live' });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqPostRankingList(reqOption));
  }, [reqOption]);

  return (
    <>
      <div className="content_subtitle">
        <h4 className="h4Type eng">Post Ranking</h4>
        <div className="btn_content_align">
          {menu.map((item) => (
            <button type="button" className={classNames({ active: item.id === reqOption.sort })} key={item.id}>
              <span id={item.id} onClick={(e) => setReqOption({ ...reqOption, sort: e.target.id })} aria-hidden="true">
                {item.txt}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="nav_category">
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
                <span>{item.txt}</span>
              </button>
            ))}
          </ResponsiveSlider>
        </div>
      </div>
    </>
  );
}

export default PostSearch2;
