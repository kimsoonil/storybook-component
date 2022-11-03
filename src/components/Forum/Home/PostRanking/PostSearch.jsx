import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { reqPostRankingList } from 'redux/store/forum/postRankingListSlice';
import ResponsiveSlider from 'components/common/Slider/ResponsiveSlider';

function PostSearch() {
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
      <span style={{ marginLeft: '10px' }}>
        {menu.map((item) => (
          <button
            style={{ backgroundColor: item.id === reqOption.sort ? 'red' : 'white', marginLeft: '10px' }}
            key={item.id}
            id={item.id}
            onClick={(e) => setReqOption({ ...reqOption, sort: e.target.id })}
          >
            {item.txt}
          </button>
        ))}
      </span>
      <ResponsiveSlider>
        {categoy.map((item) => (
          <div key={item.id}>
            <button
              style={{ backgroundColor: item.id === reqOption.category ? 'red' : 'white', marginLeft: '10px' }}
              id={item.id}
              onClick={(e) => setReqOption({ ...reqOption, category: e.target.id })}
            >
              {item.txt}
            </button>
          </div>
        ))}
      </ResponsiveSlider>
    </>
  );
}

export default PostSearch;
