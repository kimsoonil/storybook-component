/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqAllForumList } from 'redux/store/forum/forumListSlice';
import { addComma } from 'util/common';
import BoardItem from './BoardItem';

function BoardList({ title, category, forum_count, post_count, comment_count, setIsAllForum }) {
  const { forumCategoryList } = useSelector((state) => ({ ...state.forumList }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqAllForumList({ forum_category: category, page_size: 8 }));
  }, []);

  return (
    <div className="board_list">
      <div className="content_subtitle">
        <h4 className="h4Type eng">{title}</h4>
        <div className="btn_right_align">
          <div className="count_group">
            <span className="forum_count">{addComma(forum_count)}</span>
            <span className="post_count">{addComma(post_count)}</span>
            <span className="comment_count">{addComma(comment_count)}</span>
          </div>
          <div className="title_menu">
            <button type="button" className="text_btn" onClick={() => setIsAllForum(true)}>
              <span>See all</span>
            </button>
          </div>
        </div>
      </div>
      <ul className="board_thum">
        {forumCategoryList[category]?.map((item) => (
          <BoardItem info={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
