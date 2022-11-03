import React from 'react';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ForumTop from 'components/Forum/ForumTop';
// import BestPost from 'components/Forum/Theme/BestPost';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
import ForumListBanner from 'components/Forum/SideBanner/ForumCategoryBanner';
import Top5Forums from 'components/Forum/SideBanner/Top5Forums';
import WriteBtn from 'components/Forum/SideBanner/WriteBtn';

function Post() {
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <ForumTop />
          <div className="main_div blank">
            <div className="con_div">Post</div>
            <div className="right_div">
              <WriteBtn />
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

export default Post;
