import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fourmReset } from 'redux/store/forum/fourmPostSlice';
import { checkLogin } from 'util/common';

function WriteBtn({ forumId }) {
  const isLogin = checkLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onWritting = () => {
    if (isLogin) {
      dispatch(fourmReset());
      navigate(`/forum/${forumId}/writing`);
    } else {
      navigate('/login');
    }
  };
  return (
    <div>
      <button type="button" className="btn writing" onClick={onWritting}>
        <span>Writing</span>
      </button>
    </div>
  );
}

export default WriteBtn;
