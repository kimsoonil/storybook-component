/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ForumTop from 'components/Forum/ForumTop';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
import ForumCategoryBanner from 'components/Forum/SideBanner/ForumCategoryBanner';
import { reqForumInfo } from 'redux/store/forum/forumInfoSlice';
import userThumb from 'html/img/com/user thumb.png';
import WriteBtn from 'components/Forum/SideBanner/WriteBtn';
import AllForum from 'components/Forum/AllForum/AllForum';

function InitSetting() {
  const { id, title, forum_category, description, banner_image, thumbnail_image, forum_staffs, forbidden_words, bans } =
    useSelector((state) => ({
      ...state.forumInfo
    }));
  const [isAllForum, setIsAllForum] = useState(false);
  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(reqForumInfo(params.id));
  }, []);
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <ForumTop />
          <div className="main_div">
            <div className="con_div">
              <div>
                <div className="content_subtitle creat">
                  <h4 className="title creat">Settings</h4>
                  <div className="title_menu">
                    <button type="button" className="btn button_md black" onClick={() => navigate(`/forum/${id}/auth`)}>
                      <span>Transfer of authority to Staff</span>
                    </button>
                    <button
                      type="button"
                      className="btn primary button_md edit"
                      onClick={() => navigate(`/forum/${id}/edit`)}
                    >
                      <span>Edit a Forum</span>
                    </button>
                  </div>
                </div>
                <div className="forum_setting">
                  <div>
                    <div className="setting_title">
                      <div className="title required">Forum Name</div>
                    </div>
                    <div className="forum_name">{title}</div>
                  </div>
                  <div>
                    <div className="setting_title">
                      <div className="title required">Category</div>
                    </div>
                    <div className="forum_category">{forum_category.title}</div>
                  </div>
                  <div>
                    <div className="setting_title">
                      <div className="title required">Introduction</div>
                    </div>
                    <div className="forum_info">{description}</div>
                  </div>
                  {/* <div>
                    <div className="setting_title">
                      <div className="title img">
                        Forum Thumbnail <em>(Option)</em>
                      </div>
                      <span className="text">
                        Images less than 10MB
                        <br />
                        <span className="point">200 x 200px</span>
                      </span>
                    </div>
                    <div />
                  </div> */}
                  <div>
                    <div className="setting_title">
                      <div className="title img">
                        Forum Thumbnail <em>(Option)</em>
                      </div>
                      <span className="text">
                        Images less than 10MB
                        <br />
                        <span className="point">200 x 200px</span>
                      </span>
                    </div>
                    <div className="forum_thum">
                      <img src={thumbnail_image} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="setting_title">
                      <div className="title img">
                        Forum Top Image <em>(Option)</em>
                      </div>
                      <span className="text">
                        Images less than 10MB
                        <br />
                        <span className="point">1280 x 268px</span>
                      </span>
                    </div>
                    <div className="forum_top">
                      <img src={banner_image} alt="" />
                    </div>
                  </div>
                  <div>
                    <div className="setting_title">
                      <div className="title staff">
                        Staff <em>(Option)</em>
                      </div>
                    </div>
                    <div>
                      <ul className="staff_list">
                        {forum_staffs?.map((item) => (
                          <li key={item.id}>
                            <dl>
                              <dt>
                                <img src={item.profile_image || userThumb} alt="" />
                              </dt>
                              <dd>{item.username}</dd>
                            </dl>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div>
                    <div className="setting_title">
                      <div className="title block">Forbidden Words</div>
                    </div>
                    <div className="forum_block">
                      <div className="tag_box">
                        {forbidden_words?.map((word) => (
                          <button type="button" className="tag">
                            <span>{word}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="setting_title">
                      <div className="title block">Banned User</div>
                    </div>
                    <div>
                      <ul className="block_list">
                        {bans?.map((nickname) => (
                          <li>
                            <dl className="open_tip">
                              <dt>
                                <img src={userThumb} alt="" />
                              </dt>
                              <dd>{nickname}</dd>
                            </dl>
                            <div className="tooltip bottom">
                              <span>
                                <span className="point">Reasons</span> : Restricted for causing frequent swear words and
                                troubles in the forum.
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Right Banner Start */}
            <div className="right_div">
              <WriteBtn forumId={params.id} />
              <SideImgBanner />
              <HistoryBanner setIsShow={setIsAllForum} setCategory={setCategory} />
              <ForumCategoryBanner setIsShow={setIsAllForum} setCategory={setCategory} />
            </div>
            {/* Right Banner End */}
          </div>
        </div>
        <Footer />
      </div>
      <AllForum isShow={isAllForum} setIsShow={setIsAllForum} category={category} />
    </div>
  );
}

export default InitSetting;
