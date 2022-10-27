import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import CreateForumBanner from 'components/Forum/SideBanner/CreateForumBanner';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import Info from 'components/Forum/Create/Info';
import {
  IMAGE_TYPE_BANNER,
  IMAGE_TYPE_THUMBNAIL,
  BANNER_IMAGE_WIDTH,
  BANNER_IMAGE_HEIGHT,
  THUMBNAIL_IMAGE_WIDTH,
  THUMBNAIL_IMAGE_HEIGHT
} from 'constants/type';
import { reqForumCreate } from 'redux/store/forum/forumCreateSlice';
import { reqCategoryList } from 'redux/store/common/categoryListSlice';
import ForumCategoryBanner from '../SideBanner/ForumCategoryBanner';

import CropImg2 from './CropImg2';

function Create() {
  const [forumInfo, setForumInfo] = useState({
    title: '',
    forum_category: '',
    description: '',
    master_nickname: 'testNick',
    [IMAGE_TYPE_BANNER]: '',
    [IMAGE_TYPE_THUMBNAIL]: '',
    [`${IMAGE_TYPE_BANNER}_filename`]: '',
    [`${IMAGE_TYPE_THUMBNAIL}_filename`]: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    forum_category: '',
    description: '',
    [IMAGE_TYPE_BANNER]: '',
    [IMAGE_TYPE_THUMBNAIL]: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onCreate = () => {
    const formData = new FormData();
    formData.append('title', forumInfo.title);
    formData.append('forum_category', forumInfo.forum_category.id);
    formData.append('description', forumInfo.description);
    formData.append('master_nickname', forumInfo.master_nickname);
    if (forumInfo.banner_image)
      formData.append(IMAGE_TYPE_BANNER, forumInfo.banner_image, forumInfo.banner_image_filename);
    if (forumInfo.thumbnail_image)
      formData.append(IMAGE_TYPE_THUMBNAIL, forumInfo.thumbnail_image, forumInfo.thumbnail_image_filename);
    console.log('formData::', formData);
    dispatch(reqForumCreate({ navigate, formData }));
  };

  useEffect(() => {
    // navigate(`/forum/theme/${forumInfo.id}`);
    console.log('forumInfo::', forumInfo);
  }, [forumInfo]);

  useEffect(() => {
    dispatch(reqCategoryList());
  }, []);

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="main_div">
            <div className="con_div">
              {/* S : Forum 게시판 생성 */}
              <div className="creat_div">
                <div className="content_subtitle creat">
                  <h4 className="title creat">Create a Forum</h4>
                  <div className="title_menu">
                    <button type="button" className="text_btn" onClick={() => navigate('/forum')}>
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
                </div>
                <div className="page_btn_wrap full">
                  <button
                    type="button"
                    className="btn primary button_xl"
                    onClick={onCreate}
                    disabled={!forumInfo.title || forumInfo.forum_category === '0' || !forumInfo.description}
                  >
                    <span>Create a Forum</span>
                  </button>
                </div>
              </div>
              {/* E :  Forum 게시판 생성 */}
            </div>
            <div className="right_div">
              {/* S : What do you like */}
              <CreateForumBanner />
              {/* E : What do you like */}
              <SideImgBanner />
              <ForumCategoryBanner />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Create;
