import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import userThumbImg from 'html/img/com/user thumb.png';
import profileTopImg from 'html/img/com/profile_top.jpg';
import profileImg from 'html/img/com/profile.jpg';
import logoImg from 'html/img/com/logo.jpg';
import { reqLogOut } from 'redux/store/common/logInSlice';

function ProfileLayer({ isShow, setIsShow, isDim }) {
  const ref = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { tag, nickname } = useSelector((state) => ({ ...state.logIn.user }));

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && isShow && !isDim) {
        setIsShow(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isShow]);
  return (
    <div className="mini_profile_popup" style={{ display: isShow ? 'inline-block' : 'none' }} ref={ref}>
      <div className="mini_profile_top">
        <div className="user_badge_area">
          {Math.floor(Math.random() * 2) === 1 && <span className="user_badge ex2" />}
          {Math.floor(Math.random() * 2) === 1 && <span className="user_badge ex3" />}
          {Math.floor(Math.random() * 2) === 1 && <span className="user_badge ex1" />}
          {Math.floor(Math.random() * 2) === 1 && <span className="user_badge ex4" />}
        </div>
        <img src={profileTopImg} alt="" />
        <button type="button" className="btn_setting" onClick={() => navigate('/account')}>
          <span className="a11y">설정</span>
        </button>
        <button type="button" className="btn_logout" onClick={() => dispatch(reqLogOut({ id: 1, navigate }))}>
          <span className="a11y">로그아웃</span>
        </button>
      </div>
      <div className="mini_profile_con">
        <div className="mini_profile_photo">
          <div className="profile_photo_div">
            <img src={profileImg} alt="" />
          </div>
          <div className="forum_logo">
            <img src={logoImg} alt="" />
          </div>
        </div>
        <div className="mini_profile_name">
          <span className="nick">{nickname}</span>
          <span className="num">#{tag}</span>
          <span className="status on" />
        </div>
        <div className="mini_profile_info">I’ve been waiting ages!</div>
        <div className="mini_profile_in">
          {Math.floor(Math.random() * 2) === 1 && <span className="ico_in music" />}
          {Math.floor(Math.random() * 2) === 1 && <span className="ico_in dog" />}
          {Math.floor(Math.random() * 2) === 1 && <span className="ico_in swim" />}
          {Math.floor(Math.random() * 2) === 1 && <span className="ico_in wine" />}
        </div>
        <ul className="mini_profile_total">
          <li>
            <dl>
              <dt>458</dt>
              <dd>Friends</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>780</dt>
              <dd>Heart</dd>
            </dl>
          </li>
          <li>
            <dl>
              <dt>168</dt>
              <dd>Respect</dd>
            </dl>
          </li>
        </ul>
        <textarea
          className="mini_profile_textarea"
          defaultValue="Hi! I’m master of TWICE’s official fan club ONCE. I like to use Korean, English, and Japanese and travel.. to various countries.Hi! I’m master of TWICE’s official fan club ONCE. I like to use Korean, English, and Japanese and travel.. to various countries."
        />
        {/* <div className="mini_profile_friends">
          <div className="friends_img">
            <img src={userThumbImg} className="img01" alt="" />
            <img src={userThumbImg} className="img02" alt="" />
            <img src={userThumbImg} className="img03" alt="" />
            <img src={userThumbImg} className="img04" alt="" />
            <img src={userThumbImg} className="img05" alt="" />
            <img src={userThumbImg} className="img06" alt="" />
          </div>
          <div className="friends_num">
            Mutual Friends by <span>28 others</span>
          </div>
        </div> */}
        <div className="mini_profile_note">
          <span>Twice Fan, ONCE’s Master</span>
        </div>
        <div className="mini_profile_btn">
          <button type="button" className="follow">
            <span>Add Friend</span>
          </button>
          <button type="button" className="msg">
            <span>Message</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileLayer;
