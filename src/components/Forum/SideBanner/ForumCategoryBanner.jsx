import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqCategoryList } from 'redux/store/common/categoryListSlice';

function ForumCategoryBanner({ setIsShow, setCategory }) {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => ({ ...state.categoryList }));
  useEffect(() => {
    dispatch(reqCategoryList());
  }, []);
  return (
    <div className="category">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Category</h4>
        <div className="title_menu">
          <button type="button" className="hover">
            <span>All forums</span>
          </button>
        </div>
      </div>
      <ul className="category_list">
        {catList?.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              setIsShow(true);
              setCategory(item.id);
            }}
            aria-hidden
          >
            <span className="category_name">{item.title}</span>
            <span className="category_level">{item.forum_count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ForumCategoryBanner;
