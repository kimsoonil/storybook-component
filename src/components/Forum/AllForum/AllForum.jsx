/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { reqAllForumList, reset } from 'redux/store/forum/forumAllSearchListSlice';
import { useInView } from 'react-intersection-observer';
import { reqCategoryList } from 'redux/store/common/categoryListSlice';
import classNames from 'classnames';

function AllForum({ isShow, setIsShow, category }) {
  // const [defaultCategory, setDefaultCategory] = useState(category);
  const [reqOption, setReqOption] = useState({ forum_category: '', period: '', ordering: '' });
  const { hasNextPage, allForumList, count } = useSelector((state) => ({ ...state.forumAllSearchList }));
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { catList } = useSelector((state) => ({ ...state.categoryList }));
  // ordering='-title'
  const menu = [
    { id: 'live', txt: 'Live' },
    { id: 'weekly', txt: 'Weekly' },
    { id: 'monthly', txt: 'Monthly' }
  ];

  const menu2 = [
    { id: '-new', txt: 'New' },
    { id: '-rising', txt: 'Rising' }
  ];

  // 닫혔을 경우 store 초기화
  useEffect(() => {
    if (!isShow) dispatch(reset());
  }, [isShow]);

  useEffect(() => {
    dispatch(reqCategoryList());
  }, []);

  useEffect(() => {
    dispatch(reqAllForumList(reqOption));
  }, [reqOption]);

  // side banner에서 클릭했을 경우
  useEffect(() => {
    if (category) {
      setReqOption({ ...reqOption, forum_category: category });
      dispatch(reqAllForumList({ ...reqOption, forum_category: category }));
    }
  }, [category]);

  useEffect(() => {
    if (inView && hasNextPage) {
      dispatch(reqAllForumList(reqOption));
    }
  }, [hasNextPage, inView]);

  // modal 바깥쪽 스크롤 금지
  useEffect(() => {
    if (isShow) {
      document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isShow]);

  return (
    <div style={{ display: isShow ? 'inline-block' : 'none' }}>
      <div id="modal" />
      <div className="modal_popup modal_text" style={{ width: 1000, height: 850 }}>
        <div className="forum_con">
          <button type="button" className="close" onClick={() => setIsShow(false)} />
          <h2 className="modal_title">All Forums</h2>
          <ul className="pop_category">
            <li>
              <button
                type="button"
                className={classNames({
                  on: reqOption?.forum_category === ''
                })}
                onClick={() => setReqOption({ ...reqOption, forum_category: '' })}
              >
                <span>All</span>
              </button>
            </li>
            {catList?.map((item) => (
              <li key={item.title}>
                <button
                  type="button"
                  id={item.id}
                  className={classNames({
                    on: reqOption?.forum_category === item.id
                  })}
                  onClick={() => setReqOption({ ...reqOption, forum_category: item.id })}
                >
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="pop_category_search">
            <div className="search_title">
              Total <span className="search_num">{count}</span>
            </div>
            <div className="search_terms">
              <div className="pop_terms">
                <div className="radio_button">
                  <div className="radio_wrap six">
                    <span className="form_cell btn_radio size_md">
                      <input
                        type="radio"
                        name="subOption"
                        id="-title"
                        value="-title"
                        checked={reqOption?.ordering === '-title'}
                        onChange={() => setReqOption({ ...reqOption, ordering: '-title' })}
                      />
                      <label htmlFor="-title">
                        <span>ABC</span>
                      </label>
                    </span>
                    {menu.map((item) => (
                      <span className="form_cell btn_radio size_md" key={item.id}>
                        <input
                          type="radio"
                          name="subOption"
                          id={item.id}
                          value={item.id}
                          checked={item.id === reqOption?.period}
                          onChange={() => setReqOption({ ...reqOption, period: item.id })}
                        />
                        <label htmlFor={item.id}>
                          <span>{item.txt}</span>
                        </label>
                      </span>
                    ))}
                    {menu2.map((item) => (
                      <span className="form_cell btn_radio size_md" key={item.id}>
                        <input
                          type="radio"
                          name="subOption2"
                          id={item.id}
                          value={item.id}
                          checked={item.id === reqOption?.ordering}
                          onChange={() => setReqOption({ ...reqOption, ordering: item.id })}
                        />
                        <label htmlFor={item.id}>
                          <span>{item.txt}</span>
                        </label>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="pop_search">
                <div className="form_wrap">
                  <span className="form_cell form_input search_noline">
                    <input type="text" placeholder="Search..." />
                    <button className="btn_input input_search" disabled>
                      <span className="a11y">검색</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {allForumList?.length === 0 ? (
            <div className="pop_nosearch">
              <dl>
                <dt>Newjeans is not found forum</dt>
                <dd>
                  This forum was not found.
                  <br />
                  Change your search terms or visit other recommended forums.
                </dd>
              </dl>
            </div>
          ) : (
            <div className="pop_search_con">
              <ul>
                {allForumList?.map((item, idx) => (
                  <li key={item.id} onClick={() => navigate(`/forum/${item.id}/theme`)} aria-hidden>
                    <div className="search_img">
                      <img src={item.thumbnail_image} alt="" />
                      <div
                        className={classNames(
                          'rank_badge_small',
                          { gold: idx === 0 },
                          { silver: idx === 1 },
                          { bronze: idx === 2 },
                          { normal: idx > 2 }
                        )}
                      >
                        {idx > 2 && <span>{idx + 1}</span>}
                      </div>
                    </div>
                    <div className="search_con">
                      <span className="label">{item.forum_category.title}</span>
                      <dl>
                        {/* 검색어에 포인트로 search_text class 추가  */}
                        <dt>
                          <span className="search_text">{item.title}</span>
                        </dt>
                        <dd>{item.description}</dd>
                      </dl>
                      <div className="forum_writer">
                        <span className="write_img">
                          <img src={item.user.profile_image_url} alt="" />
                        </span>
                        <span className="write_name">{item.user.username}</span>
                      </div>
                    </div>
                    <div className="search_other">
                      <div className="count_group search">
                        <span className="post_count">{item.post_count}</span>
                        <span className="comment_count">{item.comment_count}</span>
                      </div>
                      <div className="search_area">
                        <span className="ranknum up">{Math.floor(Math.random() * 2)}</span>
                        <div className="search_badge">
                          {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge new" />}
                          {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge good" />}
                          {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge best_live_simple" />}
                          {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge best_weekly_simple" />}
                          {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge best_monthly_simple" />}
                          {/* {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge rising_forum" />}
                          {Math.floor(Math.random() * 2) === 1 && <span className="forum_badge recommend_forum" />} */}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div ref={ref} style={{ position: 'absolute', bottom: '100px', backgroundColor: 'grey', height: '30px' }} />
    </div>
  );
}

export default AllForum;
