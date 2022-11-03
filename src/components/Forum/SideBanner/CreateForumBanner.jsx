import React from 'react';
import { useNavigate } from 'react-router';
import { addComma, checkLogin } from 'util/common';
import ForumSummarySlide from '../Home/ForumSummarySlide';

function CreateForumBanner() {
  const isLogin = checkLogin();
  const navigate = useNavigate();
  const onCreate = () => {
    if (isLogin) navigate('/forum/create');
    else navigate('/login');
  };
  return (
    <div className="what_like">
      <dl className="what_like_title">
        <dt>What do you like?</dt>
        <dd>
          Enjoy various forums or create your
          <br />
          own forum and communicate freely.
        </dd>
      </dl>
      <ForumSummarySlide>
        <div className="posts like_num">
          <dl>
            <dt>{addComma(40523423)}</dt>
            <dd>posts</dd>
          </dl>
        </div>
        <div className="comments like_num">
          <dl>
            <dt>{addComma(1936820923)}</dt>
            <dd>comments</dd>
          </dl>
        </div>
      </ForumSummarySlide>
      <button type="button" className="btn primary button_md forum_creat" onClick={onCreate}>
        <span>Create a Forum</span>
      </button>
    </div>
  );
}

export default CreateForumBanner;
