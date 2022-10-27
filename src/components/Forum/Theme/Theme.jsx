import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ForumTop from 'components/Forum/ForumTop';
import BestPost from 'components/Forum/Theme/BestPost';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
import ForumListBanner from 'components/Forum/SideBanner/ForumCategoryBanner';
import Top5Forums from 'components/Forum/SideBanner/Top5Forums';
import List from 'components/Forum/Theme/List';
import { reqForumInfo } from 'redux/store/forum/forumInfoSlice';

function Theme() {
  // const {
  //   title,
  //   forum_category,
  //   discription,
  //   banner_image,
  //   master_nickname,
  //   thumbnail_image,
  //   staffList,
  //   fword,
  //   banList
  // } = useSelector((state) => ({
  //   ...state.forumInfo
  // }));
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
          <div className="main_div blank">
            <div className="con_div">
              <BestPost />
              <List />
              {/* E : Forum List */}
            </div>
            <div className="right_div">
              <div>
                <button type="button" className="btn writing">
                  <span>Writing</span>
                </button>
              </div>
              <SideImgBanner />
              <HistoryBanner />
              <ForumListBanner />
              <Top5Forums />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Theme;
