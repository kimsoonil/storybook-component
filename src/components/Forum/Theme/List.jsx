import React, { useState, useEffect } from 'react';
import useToggle from 'hook/useToggle';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { getFourmPostsInit } from 'redux/store/forum/fourmPostSlice';
import { Loader } from 'components/idist/Loader';
import classNames from 'classnames';
import Item from './Item';

function FilterPopup({ isVisible, schOption, setSchOption }) {
  const arrPeriod = [
    { id: 1, text: 'A week' },
    { id: 2, text: '3 month' },
    { id: 3, text: 'Select a text' }
  ];
  return (
    <div className="filter_popup" style={{ display: isVisible ? 'inline-block' : 'none' }}>
      <ul className="filter_terms">
        <li>
          <dl>
            <dt>Sort by</dt>
            <dd>
              <div className="radio_button">
                <div className="radio_wrap double">
                  <span className="form_cell btn_radio size_sm">
                    <input
                      type="radio"
                      id="radio1"
                      valeu={1}
                      defaultChecked
                      onClick={(e) => setSchOption({ ...schOption, sort: e.target.value })}
                    />
                    <label htmlFor="radio1">
                      <span>Latest order</span>
                    </label>
                  </span>
                  <span className="form_cell btn_radio size_sm">
                    <input
                      type="radio"
                      id="radio2"
                      valeu={1}
                      onClick={(e) => setSchOption({ ...schOption, sort: e.target.value })}
                    />
                    <label htmlFor="radio2">
                      <span>Popular order</span>
                    </label>
                  </span>
                </div>
              </div>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>text</dt>
            <dd>
              <div className="radio_button">
                <div className="radio_wrap third">
                  {arrPeriod.map((item) => (
                    <span className="form_cell btn_radio size_sm" key={item.id}>
                      <input
                        type="radio"
                        id="radio3"
                        value={item.id}
                        onClick={(e) => setSchOption({ ...schOption, date: e.target.value })}
                      />
                      <label htmlFor="radio3">
                        <span>{item.text}</span>
                      </label>
                    </span>
                  ))}
                  {/* <span className="form_cell btn_radio size_sm">
                    <input type="radio" id="radio3" />
                    <label htmlFor="radio3">
                      <span>A week</span>
                    </label>
                  </span> */}
                  {/* <span className="form_cell btn_radio size_sm">
                    <input type="radio" id="radio4" />
                    <label htmlFor="radio4">
                      <span>3 month</span>
                    </label>
                  </span>
                  <span className="form_cell btn_radio size_sm">
                    <input type="radio" id="radio5" />
                    <label htmlFor="radio5">
                      <span>Select a text</span>
                    </label>
                  </span> */}
                </div>
              </div>
            </dd>
          </dl>
        </li>
        <li>
          <dl>
            <dt>Keyword</dt>
            <dd>
              <div className="form_wrap saerch">
                <span className="form_cell form_input input_sm">
                  <input
                    type="text"
                    placeholder="Search ..."
                    onChange={(e) => setSchOption({ ...schOption, keyword: e.target.value })}
                  />
                  <button className="btn_input input_search">
                    <span className="a11y">검색</span>
                  </button>
                </span>
              </div>
            </dd>
          </dl>
        </li>
      </ul>
      <div className="page_btn_wrap">
        <button type="button" className="cancel">
          <span>Cancel</span>
        </button>
        <button type="button" className="done">
          <span>Done</span>
        </button>
      </div>
    </div>
  );
}

function List() {
  const dispatch = useDispatch();
  const [schOption, setSchOption] = useState({ category: 1, sort: 1 });
  const [isFilterVisible, setIsFilterVisible] = useToggle(false);
  const { fourmPosts } = useSelector((state) => state.forumPost);
  const { id } = useParams();
  const list = [1, 2, 3, 4, 5];
  const menu = [
    { id: 1, text: 'All' },
    { id: 2, text: 'Best' }
  ];

  useEffect(() => {
    dispatch(getFourmPostsInit({ id: id }));
  }, []);

  console.log('fourmPosts', fourmPosts);

  return (
    // className="forum_list"
    <div className="forum_list">
      <div className="forum_list_title">
        <div>
          <h3 className="h3_title">Forum List</h3>
          <div>
            {menu.map((item) => (
              <button
                type="button"
                key={item.id}
                className={classNames('tab_box', { active: schOption.category === item.id })}
                onClick={() => setSchOption({ ...schOption, category: item.id })}
              >
                <span>{item.text}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="board_align">
          <button type="button" className="align filter line" onClick={() => setIsFilterVisible()}>
            <span className="a11y">정렬</span>
          </button>
          <button type="button" className="align gallery">
            <span className="a11y">갤러리형식</span>
          </button>
          <button type="button" className="align list">
            <span className="a11y">목록형식</span>
          </button>
          <button type="button" className="align feed">
            <span className="a11y">피드형식</span>
          </button>
          <FilterPopup isVisible={isFilterVisible} schOption={schOption} setSchOption={setSchOption} />
        </div>
      </div>
      <div className="forum_list">
        {fourmPosts.message !== 'ok' ? (
          <div className="flex-center">
            <Loader />
          </div>
        ) : (
          <ul className="main_forum_list">
            {fourmPosts.data.map((item) => (
              <Item info={item} key={item.id} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default List;
