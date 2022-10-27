/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqForumList, reset } from 'redux/store/forum/forumListSlice';
import { useInView } from 'react-intersection-observer';
import { reqCategoryList } from 'redux/store/common/categoryListSlice';
// import userThumb from 'html/img/com/user thumb.png';
import chatImg from 'html/img/com/chat.png';
// import Category from './Category';
// import ForumSearch from './ForumSearch';
// import ForumList from './ForumList';
// import Item from '../Theme/Item';
import classNames from 'classnames';

function AllForum2({ isShow, setIsShow }) {
  const [reqOption, setReqOption] = useState({ forum_category: [], page: 1, page_size: 20 });
  // const [hasNextPage, setHasNextPage] = useState(true);
  const { hasNextPage, forumList } = useSelector((state) => ({ ...state.forumList }));
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => ({ ...state.categoryList }));

  const menu = [
    { id: 'sorting', txt: 'ABC' },
    { id: 'live', txt: 'Live' },
    { id: 'weekly', txt: 'Weekly' },
    { id: 'Monthly', txt: 'Monthly' },
    { id: 'new', txt: 'New' },
    { id: 'Rising', txt: 'Rising' }
  ];

  const [selected, setSelected] = useState('');
  const [subOption, setSubOption] = useState({});
  //   const [forumId, setForumId] = useState('');

  //   const onSetSearchOption = (selectedValue) => {
  //     console.log('selectedValue:', selectedValue);

  //     if (selected.findIndex((item) => item === selectedValue) === -1) {
  //       console.log('in:', selectedValue);
  //       if (selectedValue === 'all') setSelected(['all']);
  //       else setSelected([...selected.filter((item) => item !== 'all'), selectedValue]);
  //     } else {
  //       setSelected([...selected.filter((item) => item !== selectedValue)]);
  //     }
  //   };
  const onSetSearchOption = (selectedValue) => {
    console.log('selectedValue:', selectedValue);
    // setSelected([...selected.filter((item) => item !== selectedValue)]);
    setSelected(selectedValue);
  };

  const onSearch = () => {
    dispatch(reqForumList(reqOption));
  };

  const onSuboption = (e) => {
    const { name, value } = e.target;
    setSubOption({
      [name]: value
    });
    // console.log('onSuboption', option);
    // setSubOption(option);
  };

  //   useEffect(() => {
  //     setReqOption({ ...reqOption, forumId });
  //   }, [forumId]);

  useEffect(() => {
    console.log('isShow:', isShow);
    if (!isShow) dispatch(reset());
  }, [isShow]);

  //   useEffect(() => {
  //     if (inView && hasNextPage) {
  //       dispatch(reqForumList(reqOption));
  //     }
  //   }, [hasNextPage, inView]);

  useEffect(() => {
    dispatch(reqCategoryList());
  }, []);

  useEffect(() => {
    if (!selected) setReqOption({ ...reqOption, forum_category: selected });
  }, [selected]);

  useEffect(() => {
    console.log('reqOption:::', reqOption);
  }, [reqOption]);

  useEffect(() => {
    if (inView && hasNextPage) {
      dispatch(reqForumList(reqOption));
    }
  }, [hasNextPage, inView]);

  useEffect(() => {
    console.log(typeof catList);
    console.log(catList);
  }, [catList]);

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
      {/* {isShow && <div id="modal" />} */}
      <div id="modal" />
      <div className="modal_popup modal_text" style={{ width: 1000 }}>
        <div className="forum_con">
          <button type="button" className="close" onClick={() => setIsShow(false)} />
          <h2 className="modal_title">All Forums</h2>
          <ul className="pop_category">
            <li>
              <button type="button" className={classNames({ on: selected === '' })} onClick={() => setSelected('')}>
                <span>All</span>
              </button>
            </li>
            {catList?.map((item) => (
              <li key={item.title}>
                <button
                  type="button"
                  id={item.id}
                  className={classNames({ on: selected === item.id })}
                  onClick={() => onSetSearchOption(item.id)}
                >
                  <span>{item.title}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="pop_category_search">
            <div className="search_title">
              Total <span className="search_num">1,500</span>
            </div>
            <div className="search_terms">
              <div className="pop_terms">
                <div className="radio_button">
                  <div className="radio_wrap six">
                    {menu.map((item) => (
                      <span className="form_cell btn_radio size_md" key={item.id}>
                        <input
                          type="radio"
                          name="subOption"
                          value={item.id}
                          checked={item.id === subOption}
                          onChange={(e) => onSuboption(e)}
                        />
                        <label htmlFor="radio10">
                          <span>{item.txt}</span>
                        </label>
                      </span>
                    ))}
                    {/* <span className="form_cell btn_radio size_md">
                      <input type="radio" id="radio11" />
                      <label htmlFor="radio11">
                        <span>Live</span>
                      </label>
                    </span>
                    <span className="form_cell btn_radio size_md">
                      <input type="radio" id="radio12" defaultChecked />
                      <label htmlFor="radio12">
                        <span>Weekly</span>
                      </label>
                    </span>
                    <span className="form_cell btn_radio size_md">
                      <input type="radio" id="radio13" />
                      <label htmlFor="radio13">
                        <span>Monthly</span>
                      </label>
                    </span>
                    <span className="form_cell btn_radio size_md">
                      <input type="radio" id="radio14" />
                      <label htmlFor="radio14">
                        <span>New</span>
                      </label>
                    </span>
                    <span className="form_cell btn_radio size_md">
                      <input type="radio" id="radio15" />
                      <label htmlFor="radio15">
                        <span>Rising</span>
                      </label>
                    </span> */}
                  </div>
                </div>
              </div>
              {/* <div className="pop_search">
                <input type="text" placeholder="Search.." onChange={onSearch} />
                <button type="button" onClick={onSearch}>
                  <span className="a11y">검색</span>
                </button>
              </div> */}
              <div className="pop_search">
                <div className="form_wrap">
                  <span className="form_cell form_input search">
                    <input type="text" placeholder="Search..." />
                    <button className="btn_input input_search" onClick={onSearch}>
                      <span className="a11y">검색</span>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* 검색결과값이 없을 때
  <div class="pop_nosearch">
    <dl>
      <!- ''는 검색어 ->
      <dt>'Newjeans' is not found forum</dt>
      <dd>This forum was not found.<br/>Change your search terms or visit other recommended forums.</dd>
    </dl>
  </div>
  */}
          <div className="pop_search_con">
            <ul>
              {forumList.map((item) => (
                <li key={item.id}>
                  <div className="search_img">
                    <img src={item.thumbnail_image} alt="" />
                    <div className="rank_badge_small gold" />
                  </div>
                  <div className="search_con">
                    <span className="label">CELEBRITY</span>
                    <dl>
                      {/* 검색어에 포인트로 search_text class 추가  */}
                      <dt>
                        <span className="search_text">TWICE</span>
                      </dt>
                      <dd>{item.description}</dd>
                    </dl>
                    <div className="forum_writer">
                      <span className="write_img">
                        <img src={chatImg} alt="" />
                      </span>
                      <span className="write_name">{item.username}</span>
                    </div>
                  </div>
                  <div className="search_other">
                    <div className="count_group search">
                      <span className="post_count">{item.post_count}</span>
                      <span className="comment_count">{item.comment_count}</span>
                    </div>
                    <div className="search_area">
                      <span className="ranknum down">23</span>
                      <div className="search_badge">
                        <span className="forum_badge new" />
                        <span className="forum_badge good" />
                        <span className="forum_badge best_live_simple" />
                        <span className="forum_badge best_weekly_simple" />
                        <span className="badge_forum_best_monthly_simple" />
                        <span className="forum_badge rising_forum" />
                        <span className="forum_badge recommend_forum" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div ref={ref} style={{ position: 'absolute', bottom: '100px', backgroundColor: 'grey', height: '30px' }} />
    </div>
  );
}

export default AllForum2;
