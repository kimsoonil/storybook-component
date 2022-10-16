import React, { useEffect } from 'react';
// import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { reset as historyReset, setLogOutHistory } from 'redux/store/forumHistorySlice';
import { setLogOutHistory } from 'redux/store/forum/forumHistorySlice';

function Board() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const location = useLocation();
  const params = useParams();
  const { history } = useSelector((state) => ({ ...state.forumHistory }));

  useEffect(() => {
    // dispatch(historyReset());
    const historyItem = params.name;

    if (history?.findIndex((item) => item === historyItem) === -1) {
      dispatch(setLogOutHistory(historyItem));
    }
  }, []);
  return <div>Board</div>;
}

export default Board;
