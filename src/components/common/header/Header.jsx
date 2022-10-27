import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useToggle from 'hook/useToggle';
import { checkLogin } from 'util/common';
import ProfileLayer from 'components/common/ProfileLayer';
import profileImg from 'html/img/com/profile.jpg';
import { reqForumBookMarkedList } from 'redux/store/forum/forumBookmarkedSlice';
import MenuIcon from './MenuIcon';

function Header() {
  const arrLeftMenu = [
    { name: 'HOME', path: '/home' },
    { name: 'CLUB', path: '/clubs' },
    { name: 'FORUM', path: '/forum' },
    { name: 'NFT', path: '/nft' },
    { name: 'GAME', path: '/game' },
    { name: 'DATING', path: '/dating' }
  ];
  // const isLogin = useCheckLogIn();
  const isLogin = checkLogin();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isViewProfile, setIsViewProfile] = useToggle(false);
  useEffect(() => {
    console.log('isLogin::', typeof isLogin);
  }, []);

  useEffect(() => {
    dispatch(reqForumBookMarkedList({ is_pined: true }));
  }, []);

  return (
    <div id="header_wrap">
      <div className="gnb_wrap">
        <div className="menu_wrap">
          <h1 className="logo">
            {/* <a href> */}
            <span className="a11y">SuperClub</span>
            {/* </a> */}
          </h1>
          <ul className="gnb_menu">
            {arrLeftMenu.map((item) => (
              <MenuIcon key={item.name} name={item.name} path={item.path} leftMenuArr={arrLeftMenu} />
            ))}
          </ul>
        </div>
        <div className="gnb_search">
          <input type="text" className="top_search" placeholder="Search..." />
          <button type="button" className="btn_top_search">
            <span className="a11y">검색</span>
          </button>
        </div>
        <div className="gnb_persnal">
          <ul className="persnal_menu">
            <li>
              <button type="button" className="gnb book open_tip">
                <span className="a11y">book</span>
              </button>
              <div className="tooltip bottom">
                <span>BOOKMARK</span>
              </div>
              <div className="layer_menu bookmark">
                <div className="layer_top">
                  <div className="layer_title">
                    <span className="title">Bookmark</span>
                    <button>
                      <span>See all</span>
                    </button>
                  </div>
                  <div className="layer_search">
                    <div className="form_wrap">
                      <span className="form_cell form_input">
                        <input type="text" title="input default" aria-invalid="false" placeholder="Search.." />
                        <button type="button">
                          <span className="a11y">검색</span>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="tabs">
                    <div className="tabs_menu size_sm">
                      <button type="button">
                        <span>All</span>
                      </button>
                      <button type="button">
                        <span>Clubs</span>
                      </button>
                      <button type="button">
                        <span>Board</span>
                      </button>
                      <button type="button">
                        <span>Posts</span>
                      </button>
                    </div>
                  </div>
                  저정한 북마크가 없는 경우
                  <dl className="layer_noti">
                    <dt>No Bookmark.</dt>
                    <dd>There is no bookmarked content yet.</dd>
                  </dl>
                  <dl className="layer_noti">
                    <dt>Bookmark not found.</dt>
                    <dd>Search term not found in bookmark.</dd>
                  </dl>
                </div>
                <div className="layer_scroll">
                  <ul className="layer_list">
                    <li>
                      <span className="thum round" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>Post title Post title ..</dt>
                        <dd>1m ago</dd>
                      </dl>
                      <div className="etc">
                        <span className="badge">Post</span>
                        <button type="button" className="trash">
                          <span className="a11y">삭제</span>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <div className="layer_bottom">
                    <button type="button" className="list_more">
                      <span>More</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <button type="button" className="gnb chat open_tip">
                <span className="a11y">Chat</span>
              </button>
              <div className="tooltip bottom">
                <span>CHAT</span>
              </div>
            </li>
            <li>
              <button type="button" className="gnb noti new open_tip">
                <span className="a11y">Noti</span>
              </button>
              <div className="tooltip bottom">
                <span>NOTIFICATION</span>
              </div>
              <div className="layer_menu notification noalarm">
                <span className="noti_img" />
                <dl>
                  <dt>No Notifications Yet.</dt>
                  <dd>
                    Notifications are automatically deleted
                    <br />
                    after retention for up to 90 days.
                  </dd>
                </dl>
                <button type="button" className="btn btn_round btn_secondary button_sm">
                  <span>Refresh</span>
                </button>
              </div>
              <div className="layer_menu notification">
                <div className="layer_top">
                  <span className="title">Notifications</span>
                  <div className="new_message">4</div>
                </div>
                <div className="layer_scroll">
                  <ul className="layer_list margin">
                    <li>
                      <span className="thum round" />
                      <dl>
                        <dt>
                          <span className="noti_title">Following</span>
                          <span className="noti_date">3m ago</span>
                        </dt>
                        <dd>
                          <span>Nickname</span> started following you..
                        </dd>
                      </dl>
                      <button type="button" className="follow btn_follow">
                        <span className="a11y">팔로우</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum round" />
                      <dl>
                        <dt>
                          <span className="noti_title">Like it!</span>
                          <span className="noti_date">10m ago</span>
                        </dt>
                        <dd>
                          <span>Nickname</span> like your photo.
                        </dd>
                      </dl>
                      <button type="button" className="follow btn_following">
                        <span className="a11y">팔로윙</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum round" />
                      <dl>
                        <dt>
                          <span className="noti_title">Like it!</span>
                          <span className="noti_date">3 days ago</span>
                        </dt>
                        <dd>
                          <span>Nickname</span> and <span>4 others</span> like your photo.
                        </dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>
                          <span className="noti_title">NFT Auction</span>
                          <span className="noti_date">20m ago</span>
                        </dt>
                        <dd>Someone make highest bid.</dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum half" />
                      <dl>
                        <dt>
                          <span className="noti_title">Game Ranking</span>
                          <span className="noti_date">1h ago</span>
                        </dt>
                        <dd>Someone broke your record.</dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum noti" />
                      <dl>
                        <dt>
                          <span className="noti_title">Notice</span>
                          <span className="noti_date">a day ago</span>
                        </dt>
                        <dd>
                          A new game is about to open. Thanks to a lot of anticipation and support, we are armed with
                          excellent graphics and open.
                        </dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum circle" />
                      <dl>
                        <dt>
                          <span className="noti_title">Following</span>
                          <span className="noti_date">3 days ago</span>
                        </dt>
                        <dd>
                          <span>Nickname</span> started following you.
                        </dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum round" />
                      <dl>
                        <dt>
                          <span className="noti_title">Like it!</span>
                          <span className="noti_date">3 days ago</span>
                        </dt>
                        <dd>
                          <span>Nickname</span> and <span>4 others</span> like your photo.
                        </dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                    <li>
                      <span className="thum noti" />
                      <dl>
                        <dt>
                          <span className="noti_title">1 : 1 Inguiry</span>
                          <span className="noti_date">7 days ago</span>
                        </dt>
                        <dd>The response to your inquiry has been emailed.</dd>
                      </dl>
                      <button type="button" className="trash">
                        <span className="a11y">삭제</span>
                      </button>
                    </li>
                  </ul>
                  <div className="noti_fix">
                    <div>
                      <span>Notifications are automatically deleted after retention for up to 90 days.</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            {isLogin && (
              <li className="gnb_profile_area">
                <div className="gnb_profile" onClick={() => setIsViewProfile()} aria-hidden="true">
                  <div className="gnb_profile_circle">
                    <img src={profileImg} alt="" />
                  </div>
                </div>
                {/* <div className="mini_profile_popup">
                <div className="mini_profile_top">
                  <div className="user_badge_area">
                    <span className="user_badge ex2" />
                    <span className="user_badge ex3" />
                    <span className="user_badge ex1" />
                    <span className="user_badge ex4" />
                  </div>
                  <img src="../../img/com/profile_top.jpg" />
                  <button type="button" className="btn_logout">
                    <span className="a11y">로그아웃</span>
                  </button>
                </div>
                <div className="mini_profile_con">
                  <div className="mini_profile_photo">
                    <div className="profile_photo_div">
                      <img src="../../img/com/profile.jpg" />
                    </div>
                    <div className="forum_logo">
                      <img src="../../img/com/logo.jpg" />
                    </div>
                  </div>
                  <div className="mini_profile_name">
                    <span className="nick">ONCE:Master</span>
                    <span className="num">#U34TY</span>
                    <span className="status on" />
                  </div>
                  <div className="mini_profile_info">I’ve been waiting ages!</div>
                  <div className="mini_profile_in">
                    <span className="ico_in music" />
                    <span className="ico_in dog" />
                    <span className="ico_in swim" />
                    <span className="ico_in wine" />
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
                  <div className="mini_profile_friends">
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
                  </div>
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
              </div> */}
                <ProfileLayer isViewProfile={isViewProfile} />
              </li>
            )}
          </ul>
          {!isLogin && (
            <button type="button" className="btn_round btn_white" onClick={() => navigate('/login')}>
              <span>Login</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
