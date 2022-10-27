/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ForumTop from 'components/Forum/ForumTop';
import AddedList from 'components/Forum/Create/AddedList';
// import Search from 'components/Forum/Create/Search';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
import Info from 'components/Forum/Create/Info';
import {
  IMAGE_TYPE_BANNER,
  IMAGE_TYPE_THUMBNAIL,
  BANNER_IMAGE_WIDTH,
  BANNER_IMAGE_HEIGHT,
  THUMBNAIL_IMAGE_WIDTH,
  THUMBNAIL_IMAGE_HEIGHT
} from 'constants/type';
import { reqForumEdit } from 'redux/store/forum/forumEditSlice';
import { reqCategoryList } from 'redux/store/common/categoryListSlice';
import { reset, reqsearchUser } from 'redux/store/common/searchUserSlice';
import { reqForumList } from 'redux/store/forum/forumListSlice';
import userThumb from 'html/img/com/user thumb.png';
import classNames from 'classnames';
import ForumListBanner from '../SideBanner/ForumListBanner';
import CropImg2 from './CropImg2';
import UserList2 from './UserList2';

const USER_LIST_STAFF = 'forum_staffs';
const USER_LIST_BAN = 'bans';

function Edit() {
  const [reqOption, setReqOption] = useState({ category: [], sort: 'week', forumId: '' });
  const [fobiddenList, setFobiddenList] = useState([]);
  const [searchType, setSearchType] = useState(USER_LIST_STAFF);
  const [banKeyWord, setBanKeyWord] = useState('');
  const [staffKeyword, setStaffKeyword] = useState('');
  // const [searchBanList, setSearchBanList] = useState([]);
  const [searchUserList, setSearchUserList] = useState([]);
  const [savedStaffList, setSavedStaffList] = useState([]);
  const [savedBanList, setSavedBanList] = useState([]);
  // const [hasNextPage, setHasNextPage] = useState(true);
  // const { hasNextPage, list } = useSelector((state) => ({ ...state.forumList }));

  const {
    id,
    title,
    forum_category,
    description,
    banner_image,
    master_nickname,
    thumbnail_image,
    forum_staffs,
    forbidden_words,
    bans
  } = useSelector((state) => ({
    ...state.forumInfo
  }));

  const [forumInfo, setForumInfo] = useState({
    id,
    title,
    forum_category,
    description,
    master_nickname,
    [IMAGE_TYPE_BANNER]: banner_image,
    [IMAGE_TYPE_THUMBNAIL]: thumbnail_image,
    [`${IMAGE_TYPE_BANNER}_filename`]: '',
    [`${IMAGE_TYPE_THUMBNAIL}_filename`]: '',
    [USER_LIST_STAFF]: forum_staffs,
    forbidden_words,
    [USER_LIST_BAN]: bans
  });

  const { user } = useSelector((state) => ({
    ...state.searchUser
  }));

  const [errors, setErrors] = useState({
    title: '',
    forum_category: '',
    description: '',
    [IMAGE_TYPE_BANNER]: '',
    [IMAGE_TYPE_THUMBNAIL]: ''
  });
  const [banWord, setBanWord] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEdit = () => {
    const formData = new FormData();
    formData.append('id', forumInfo.id);
    formData.append('title', forumInfo.title);
    formData.append('forum_category', forumInfo.forum_category.id);
    formData.append('description', forumInfo.description);
    formData.append('master_nickname', forumInfo.master_nickname);
    forumInfo.forum_staffs.map((item) => formData.append('forum_staffs', item));
    forumInfo.forbidden_words.map((item) => formData.append('forbidden_words', item));
    forumInfo.bans.map((item) => formData.append('bans', item));

    // if (typeof forumInfo.banner_image === 'string') formData.append(IMAGE_TYPE_BANNER, forumInfo.banner_image);
    if (forumInfo.banner_image.constructor.name === 'Blob')
      formData.append(IMAGE_TYPE_BANNER, forumInfo.banner_image, forumInfo.banner_image_filename);
    // if (typeof forumInfo.thumbnail_image === 'string') formData.append(IMAGE_TYPE_BANNER, forumInfo.thumbnail_image);
    if (forumInfo.thumbnail_image.constructor.name === 'Blob')
      formData.append(IMAGE_TYPE_BANNER, forumInfo.thumbnail_image, forumInfo.thumbnail_image_filename);

    console.log('formData::', formData);
    dispatch(reqForumEdit({ navigate, formData }));
  };

  const onSetWordsList = () => {
    console.log('add:::', banWord);
    console.log('forumInfo:::', forumInfo);
    if (forumInfo.forbidden_words?.findIndex((item) => item === banWord) === -1) {
      setForumInfo({ ...forumInfo, forbidden_words: [...forumInfo.forbidden_words, banWord] });
    }
  };

  const onDeleteWordsList = (word) => {
    const arr = forumInfo.forbidden_words.filter((item) => item !== word);
    setFobiddenList(arr);
    setForumInfo({ ...forumInfo, forbidden_words: arr });
  };

  const onSearchUserList = (userType) => {
    setSearchType(userType);
    if (userType === USER_LIST_BAN) {
      dispatch(reqsearchUser({ id: banKeyWord }));
      setStaffKeyword('');
    }
    if (userType === USER_LIST_STAFF) {
      dispatch(reqsearchUser({ id: staffKeyword }));
      setBanKeyWord('');
    }
  };

  const onSetList = (userId, userType) => {
    // if (userType === USER_LIST_BAN) setSearchUserList([]);
    if (userType === USER_LIST_STAFF) {
      if (savedStaffList.findIndex((item) => item === userId) === -1) setSavedStaffList([...savedStaffList, userId]);
    }
    if (userType === USER_LIST_BAN) {
      if (savedBanList.findIndex((item) => item === userId) === -1) setSavedBanList([...savedBanList, userId]);
    }
    if (forumInfo[userType]?.findIndex((item) => item.id === userId) === -1) {
      setForumInfo({ ...forumInfo, [userType]: [...forumInfo[userType], userId] });
    }
    dispatch(reset());
    setSearchUserList([]);
  };
  // const onSearch = () => {
  //   console.log('search', action);
  //   dispatch(action(staffKeyword));
  // };

  const onDeleteList = (userId, userType) => {
    let arr = [];
    console.log(userId);
    console.log(userType);
    if (userType === USER_LIST_STAFF) {
      arr = savedStaffList.filter((item) => item !== userId);
      setSavedStaffList(arr);
    }
    if (userType === USER_LIST_BAN) {
      arr = savedBanList.filter((item) => item !== userId);
      setSavedBanList(arr);
    }
  };

  useEffect(() => {
    console.log('forumInfo::::', forumInfo);
    setFobiddenList(forumInfo.forbidden_words);
  }, [forumInfo]);

  useEffect(() => {
    setReqOption({});
    dispatch(reqCategoryList());
    dispatch(reqForumList(reqOption));
  }, []);

  useEffect(() => {
    console.log('setSearchBanList:::::', user);
    console.log('setSearchBanList:::::', user);
    // banKeyWord, setBanKeyWord] = useState('');
    setSearchUserList(user);
  }, [user]);

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <ForumTop />
          <div className="main_div">
            <div className="con_div">
              <div className="creat_div">
                <div className="content_subtitle creat">
                  <h4 className="title creat">Edit a Forum</h4>
                  <div className="title_menu">
                    <button type="button" className="text_btn" onClick={() => navigate(-1)}>
                      <span>Cancle</span>
                    </button>
                  </div>
                </div>
                <div className="creat_form">
                  <span className="info title">Required Information</span>
                  <Info forumInfo={forumInfo} setForumInfo={setForumInfo} errors={errors} setErrors={setErrors} />
                  <span className="img title">Image Registration</span>
                  <div className="form_div">
                    <CropImg2
                      imgType={IMAGE_TYPE_THUMBNAIL}
                      cropWidth={THUMBNAIL_IMAGE_WIDTH}
                      cropHeight={THUMBNAIL_IMAGE_HEIGHT}
                      errors={errors}
                      setErrors={setErrors}
                      forumInfo={forumInfo}
                      setForumInfo={setForumInfo}
                    />
                    <CropImg2
                      imgType={IMAGE_TYPE_BANNER}
                      cropWidth={BANNER_IMAGE_WIDTH}
                      cropHeight={BANNER_IMAGE_HEIGHT}
                      errors={errors}
                      setErrors={setErrors}
                      forumInfo={forumInfo}
                      setForumInfo={setForumInfo}
                    />
                  </div>
                  <span className="staff title">Staff Member</span>
                  <div className="form_div">
                    <div>
                      {/* <Search action={(val) => reqsearchUser({ id: val })} />
                      <UserList2 forumInfo={forumInfo} setForumInfo={setForumInfo} userType={USER_LIST_STAFF} /> */}
                      <div>
                        <span className="form_title">Add a Staff</span>
                        <div className="form_wrap msg">
                          <span className="form_cell form_input input_lg">
                            <input
                              type="text"
                              value={staffKeyword}
                              placeholder="Search a Member"
                              onChange={(e) => setStaffKeyword(e.target.value)}
                            />
                            <button
                              className="btn_input input_search"
                              onClick={() => onSearchUserList(USER_LIST_STAFF)}
                            >
                              <span className="a11y">검색</span>
                            </button>
                          </span>
                        </div>
                      </div>
                      <ul>
                        {searchType === USER_LIST_STAFF &&
                          searchUserList?.map((item) => (
                            <li
                              className="option"
                              onClick={() => onSetList(item.id, USER_LIST_STAFF)}
                              aria-hidden
                              key={item.id}
                            >
                              <dl className="search_list">
                                <dt>
                                  <img src={userThumb} alt="" />
                                </dt>
                                <dd>
                                  <span className="point">love</span>*{item.id}_KY643L
                                </dd>
                              </dl>
                            </li>
                          ))}
                      </ul>
                      <AddedList userList={savedStaffList} onDeleteList={onDeleteList} userType={USER_LIST_STAFF} />
                      <ul className="guide">
                        <li>
                          Staff are authorized to edit images and information in the forum and process posts and
                          comments.
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span className="block title">Black List</span>
                  <div className="form_div">
                    <div>
                      <span className="form_title">Forbidden Words</span>
                      <div className="form_wrap Vgroup">
                        <span className="form_cell form_input input_lg" onChange={(e) => setBanWord(e.target.value)}>
                          <input type="text" placeholder="Please enter the word" />
                          <span className="guide_text num">
                            <span>0</span>/20
                          </span>
                        </span>
                        <button type="button" className="btn primary_line button_lg" onClick={() => onSetWordsList()}>
                          <span>Add</span>
                        </button>
                      </div>
                      <div className="hashtag_box">
                        {fobiddenList?.map((item) => (
                          <button type="button" className="hashtag">
                            <span>{item}</span>
                            <span className="delete" onClick={() => onDeleteWordsList(item)} aria-hidden />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="form_title">Banned User</span>
                      <div className="drop_wrap">
                        <div className={classNames('select', { active: searchUserList?.length > 0 })}>
                          {/* <div className="selected">
                            <div className="selected-value">love</div>
                            <ul>
                              <div>
                                <li className="option">
                                  <dl className="search_list">
                                    <dt>
                                      <img src={userThumb} alt="" />
                                    </dt>
                                    <dd>
                                      <span className="point">love</span>*princess_KY643L
                                    </dd>
                                  </dl>
                                </li>
                              </div>
                            </ul>
                            <button type="button" className="search" onChange={(e) => setKeyWord(e.target.value)}>
                              <span className="a11y">선택</span>
                            </button>
                          </div> */}
                          <div className="form_wrap msg">
                            <span className="form_cell form_input input_lg">
                              <input
                                type="text"
                                placeholder="Search a Member"
                                onChange={(e) => setBanKeyWord(e.target.value)}
                              />
                              <button
                                className="btn_input input_search"
                                onClick={() => onSearchUserList(USER_LIST_BAN)}
                              >
                                <span className="a11y">검색</span>
                              </button>
                            </span>
                          </div>
                          <ul>
                            {searchType === USER_LIST_BAN &&
                              searchUserList?.map((item) => (
                                <li className="option" onClick={() => onSetList(item.id, USER_LIST_BAN)} aria-hidden>
                                  <dl className="search_list">
                                    <dt>
                                      <img src={userThumb} alt="" />
                                    </dt>
                                    <dd>
                                      <span className="point">love</span>*{item.id}_KY643L
                                    </dd>
                                  </dl>
                                </li>
                              ))}
                          </ul>
                          <UserList2 forumInfo={forumInfo} setForumInfo={setForumInfo} userType={USER_LIST_BAN} />
                        </div>
                        <AddedList userList={savedBanList} onDeleteList={onDeleteList} userType={USER_LIST_BAN} />
                      </div>
                    </div>
                    {/* <Search action={(val) => reqsearchUser({ id: val })} />
                    <UserList2 forumInfo={forumInfo} setForumInfo={setForumInfo} type={USER_LIST_BAN} /> */}
                  </div>
                </div>
                <div className="page_btn_wrap full">
                  <button type="button" className="btn primary button_xl" onClick={() => onEdit()}>
                    <span>Save a Forum</span>
                  </button>
                </div>
              </div>
            </div>
            {/* <!-- E :  Forum 게시판 생성 ddd --> */}
            {/* Right Banner Start */}
            <div className="right_div">
              <div>
                <button type="button" className="btn writing">
                  <span>Writing</span>
                </button>
              </div>
              <SideImgBanner />
              <HistoryBanner />
              <ForumListBanner />
            </div>
            {/* Right Banner End */}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Edit;
