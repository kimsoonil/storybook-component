import React from 'react';
import { useDispatch } from 'react-redux';
import { delLogOutHistory } from 'redux/store/forum/forumHistorySlice';

function Icon({ name }) {
  const dispatch = useDispatch();

  return (
    <span style={{ marginRight: '0.5rem' }}>
      <button type="button" onClick={() => dispatch(delLogOutHistory(name))}>
        {name}
      </button>
    </span>
  );
}

export default Icon;
