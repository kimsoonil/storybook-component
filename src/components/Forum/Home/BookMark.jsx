import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import useToggle from 'hook/useToggle';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { checkLogin } from 'util/common';
import { reset, delLogOutHistory } from 'redux/store/forum/forumHistorySlice';
// import { reqForumBookMarkedList } from 'redux/store/forum/forumBookmarkedSlice';

function NoRecentVisitedForum({ strHistory }) {
  return (
    <div className="none_msg recent">
      <span>{strHistory}</span>
    </div>
  );
}

function NoBookmarkedForum({ strHistory, navigate }) {
  return (
    <div className="none_msg bookmark">
      <span>{strHistory}</span>
      <button type="button" className="btn primary_line login" onClick={() => navigate('/login')}>
        <span>Login</span>
      </button>
    </div>
  );
}

function BookMark() {
  const isLogin = checkLogin();
  const { bookMarkedList } = useSelector((state) => ({ ...state.forumBookMarkedList }));
  const { history } = useSelector((state) => ({ ...state.forumHistory }));
  const [strHistory, setStrHistroy] = useState('');
  const [arrHistory, setArrHistroy] = useState(isLogin ? bookMarkedList : history);
  const [expand, setExpand] = useToggle(true);
  const [menu, setMenu] = useState(isLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  let strNohistory = '';
  useEffect(() => {
    if (arrHistory?.length > 0) return;

    if (isLogin) {
      strNohistory = t('label.forum.history.login.nobookmarked');
    } else {
      strNohistory = arrHistory?.length === 0 && t('label.forum.history.logout.bookmark');
    }
    setStrHistroy(strNohistory);
  }, [arrHistory]);

  useEffect(() => {
    const tmpHistory = menu ? bookMarkedList : history;
    setArrHistroy(tmpHistory);
  }, [bookMarkedList, history, menu]);

  // useEffect(() => {
  //   dispatch(reqForumBookMarkedList({ is_pined: true }));
  // }, []);

  return (
    <div className="recent">
      <div className="tabs">
        <div className="tabs_menu size_md">
          <button type="button" className={classNames({ active: !menu })} onClick={() => setMenu(false)}>
            <span>Recent Visit</span>
          </button>
          <button
            type="button"
            className={classNames({ active: menu })}
            onClick={() => (isLogin ? setMenu(true) : navigate('/login'))}
          >
            <span>Bookmarked Forum</span>
          </button>
        </div>
        {/* 최근 본 포럼이 있을 경우 expand로 alldelete 버튼을 보여줍니다. */}
        {/* 최근 본 포럼 리스트가 없는 경우 버튼 비활성화(hover 없음) */}
        <button
          type="button"
          id="expand"
          className={classNames('btn_tab_con', { expand }, { close: !expand })}
          onClick={() => setExpand()}
        >
          <span>{expand ? 'Expand' : 'Close'}</span>
        </button>
        <div className="tabs_con">
          {history?.length === 0 && !menu && <NoRecentVisitedForum strHistory={strHistory} />}
          {bookMarkedList?.length === 0 && isLogin && <NoBookmarkedForum strHistory={strHistory} navigate={navigate} />}
          <ul className={classNames('recent_forum_list', { line01: expand })}>
            {arrHistory?.length > 0 &&
              arrHistory?.map((item) => (
                <li key={item.id}>
                  <div className="forum_info">
                    <span className="forum_logo" />
                    <button type="button" className="forum_name" onClick={() => navigate(`/board/${item.id}`)}>
                      <span>{item.title}</span>
                    </button>
                  </div>
                  <button type="button" className="close" onClick={() => dispatch(delLogOutHistory(item.id))}>
                    <span className="a11y">삭제</span>
                  </button>
                </li>
              ))}
          </ul>
          {/* 최근 본 포럼이 있을 경우 All delete 보여집니다. */}
          <div className="trash" style={{ display: history?.length > 0 ? 'block' : 'none' }}>
            <button type="button" onClick={() => dispatch(reset())}>
              <span>All delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookMark;
