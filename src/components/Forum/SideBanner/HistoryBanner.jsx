import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { checkLogin } from 'util/common';
import { reset, delLogOutHistory } from 'redux/store/forum/forumHistorySlice';

function NoRecentVisitedForum({ strHistory }) {
  return (
    <div className="no_recent">
      <span>{strHistory}</span>
    </div>
  );
}

function NoBookmarkedForum({ strHistory, navigate }) {
  return (
    <div className="no_bookmark">
      {/* Please login first to view
      <br />
      bookmarked forums.
      <br /> */}
      {strHistory}
      <button type="button" className="btn primary_line" onClick={() => navigate('/login')}>
        <span>Login</span>
      </button>
    </div>
  );
}

function HistoryBanner() {
  const isLogin = checkLogin();
  const { history } = useSelector((state) => ({ ...state.forumHistory }));
  const { bookMarkedList } = useSelector((state) => ({ ...state.forumBookMarkedList }));
  const [strHistory, setStrHistroy] = useState('');
  const [arrHistory, setArrHistroy] = useState(isLogin ? bookMarkedList : history);
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

  return (
    <div className="history">
      <div className="content_subtitle">
        <h4 className="h4Type eng">History</h4>
        <div className="title_menu" style={{ display: history?.length > 0 ? 'block' : 'none' }}>
          <button type="button" className="hover text_btn" onClick={() => dispatch(reset())}>
            <span>All delete</span>
          </button>
        </div>
      </div>
      <div className="tabs">
        <div className="tabs_menu size_sm">
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
        <div className="tabs_con">
          {history?.length === 0 && !menu && <NoRecentVisitedForum strHistory={strHistory} />}
          {bookMarkedList?.length === 0 && isLogin && <NoBookmarkedForum strHistory={strHistory} navigate={navigate} />}
          <ul>
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
        </div>
      </div>
    </div>
  );
}

export default HistoryBanner;
