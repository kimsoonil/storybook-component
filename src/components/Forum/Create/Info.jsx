import React, { useEffect } from 'react';
import classNames from 'classnames';
import useToggle from 'hook/useToggle';
import { useDispatch, useSelector } from 'react-redux';
import { FORUM_NAME_MAXLENGTH, FORUM_DISC_MAXLENGTH } from 'constants/type';
import { reqCategoryList } from 'redux/store/common/categoryListSlice';

function Info({ forumInfo, setForumInfo, errors, setErrors, editType }) {
  const { catList } = useSelector((state) => ({ ...state.categoryList }));
  const [expand, setExpand] = useToggle(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reqCategoryList());
  }, []);

  // useEffect(() => {
  //   console.log('forumInfo::', forumInfo);
  // }, [forumInfo]);

  return (
    <div className="form_div">
      <div>
        <span className="form_title">Forum Name</span>
        <div className={classNames('form_wrap', { msg: editType === 'create', default: editType === 'create' })}>
          <span className="form_cell form_input input_lg">
            <input
              id="forumName"
              type="text"
              value={forumInfo.title}
              placeholder="Please enter your forum name"
              onChange={(e) => setForumInfo({ ...forumInfo, title: e.target.value })}
              maxLength={FORUM_NAME_MAXLENGTH}
              onBlur={(e) => !e.target.value && setErrors({ ...errors, title: 'Please Enter your forum name' })}
            />
            <span className="guide_text num">
              <span>{forumInfo.title?.length}</span>/{FORUM_NAME_MAXLENGTH}
            </span>
          </span>
          {editType === 'create' && (
            <span className="default_txt msg" id="input_help">
              You can change the name of the forum 30 days before the forum is created.
            </span>
          )}
          {errors.title && (
            <span className="error_txt msg" id="input_error">
              {errors.title}
            </span>
          )}
        </div>
      </div>
      <div>
        <span className="form_title">Category</span>
        {/* error??? error ???????????? ??????????????? ????????? error_txt??? ??????????????? */}
        <div className={classNames('select_wrap', { error: errors.forum_category })}>
          <div className={classNames('select', { active: expand })}>
            <div className="selected" onClick={() => setExpand()} aria-hidden>
              <div className="selected-value">
                {forumInfo.forum_category ? forumInfo.forum_category.title : 'Please select a forum category'}
              </div>
              <button type="button" className="arrow">
                <span className="a11y">??????</span>
              </button>
            </div>
            <ul>
              {catList?.map((item) => (
                <li
                  className="option"
                  key={item.id}
                  value={item.id}
                  onClick={() => {
                    setForumInfo({ ...forumInfo, forum_category: item });
                    setExpand();
                  }}
                  aria-hidden
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
          {errors.forum_category && <span className="error_txt">{errors.forum_category}</span>}
        </div>
      </div>
      <div>
        <span className="form_title">Introduction</span>
        <div className="text_area">
          <textarea
            id="description"
            onChange={(e) => setForumInfo({ ...forumInfo, description: e.target.value })}
            maxLength={FORUM_DISC_MAXLENGTH}
            onBlur={(e) => !e.target.value && setErrors({ ...errors, description: 'Please Enter your description' })}
            defaultValue={forumInfo.description}
          />
          {/* ???????????? 0????????? black??? ???????????? ???????????? ????????????????????? ????????? ????????????. */}
          <span className="num">
            <span className={classNames({ black: forumInfo.description?.length > 0 })}>
              {forumInfo.description?.length}
            </span>
            /{FORUM_DISC_MAXLENGTH}
          </span>
          {errors.description && <span className="error_txt">{errors.description}</span>}
        </div>
      </div>
    </div>
  );
}

export default Info;
