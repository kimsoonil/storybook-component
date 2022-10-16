// import usePrevState from 'hook/usePrevState';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reqSubscribeForum } from 'redux/store/forum/subscribeForumSlice';
import { setSubsForum } from 'redux/store/forum/forumListSlice';
import { useTranslation } from 'react-i18next';

function Subscribe({ forumId, status }) {
  const [subsInfo, setSubsInfo] = useState({});
  const { subsStatus, isLoading } = useSelector((state) => ({ ...state.subscribeForum }));
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubs = useCallback((id, sts) => {
    setSubsInfo({ forumId: id, subsStatus: !sts });
    dispatch(reqSubscribeForum({ forumId: id, subsStatus: !sts }));
  }, []);

  useEffect(() => {
    if (subsInfo.forumId && !isLoading) {
      const contents = subsStatus
        ? t('popup.contents', { context: 'subscribe' })
        : t('popup.contents', { context: 'unsubscribe' });
      dispatch(setSubsForum({ forumId: subsInfo.forumId, subsStatus, dispatch, contents }));
    }
  }, [subsStatus, subsInfo]);

  return (
    <span
      id={forumId}
      style={{ backgroundColor: status ? 'pink' : 'white' }}
      onClick={() => onSubs(forumId, status)}
      aria-hidden="true"
    >
      ##Subscribe:{status ? '@@@' : '-'}##
    </span>
  );
}

export default Subscribe;
