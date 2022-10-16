import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useCheckLogIn from 'hook/useCheckLogIn';
import { reset } from 'redux/store/forum/forumHistorySlice';
import Icon from './Icon';

function BookMark({ localHistory }) {
  const [strHistory, setStrHistroy] = useState('');
  const [arrHistory, setArrHistroy] = useState([]);
  const dispatch = useDispatch();
  const isLogin = useCheckLogIn();
  const { t } = useTranslation();
  const { forumHistory } = useSelector((state) => ({ ...state.accountInfo }));
  const onAllDeleteHistory = () => {
    dispatch(reset());
  };

  let strNohistory = '';
  useEffect(() => {
    if (arrHistory.length > 0) return;

    if (isLogin) {
      strNohistory = t('label.forum.history.login.nobookmarked');
    } else {
      strNohistory = arrHistory.length === 0 && t('label.forum.history.logout.bookmark');
    }
    setStrHistroy(strNohistory);
  }, [arrHistory]);

  useEffect(() => {
    const history = isLogin ? forumHistory : localHistory;
    setArrHistroy(history);
  }, [forumHistory]);

  return (
    <>
      <div>
        <button onClick={() => onAllDeleteHistory()}>All Delete</button>
      </div>
      <div
        style={{
          height: '50px',
          width: '100%',
          marginTop: '1rem'
        }}
      >
        {arrHistory?.length > 0 ? arrHistory?.map((item) => <Icon key={item} name={item} />) : <div>{strHistory}</div>}
      </div>
    </>
  );
}

export default BookMark;
