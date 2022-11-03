import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reqForumInfo } from 'redux/store/forum/forumInfoSlice';
import { setLogOutHistory } from 'redux/store/forum/forumHistorySlice';
import { reqForumIdPostList } from 'redux/store/forum/forumIdPostListSlice';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import ForumTop from 'components/Forum/ForumTop';
import BestPost from 'components/Forum/Theme/BestPost2';
import SideImgBanner from 'components/Forum/SideBanner/SideImgBanner';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
import ForumCategoryBanner from 'components/Forum/SideBanner/ForumCategoryBanner';
import Top5Forums from 'components/Forum/SideBanner/Top5Forums';
import List from 'components/Forum/Theme/List';
import AllForum from 'components/Forum/AllForum/AllForum';
import WriteBtn from '../SideBanner/WriteBtn';

function Theme() {
  const { id, title } = useSelector((state) => ({
    ...state.forumInfo
  }));
  const { forumIdPostList } = useSelector((state) => ({ ...state.forumIdPostList }));
  const [isAllForum, setIsAllForum] = useState(false);
  const [category, setCategory] = useState(0);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(reqForumInfo(params.id));
    dispatch(reqForumIdPostList({ forumId: params.id, page_size: 5 }));
  }, []);

  const { history } = useSelector((state) => ({ ...state.forumHistory }));

  useEffect(() => {
    if (history?.findIndex((item) => item.id === id) === -1 && id) {
      dispatch(setLogOutHistory({ id, title }));
    }
  }, [id]);
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <ForumTop forumId={params.id} />
          <div className="main_div blank">
            <div className="con_div">
              {forumIdPostList.length > 0 && <BestPost forumId={params.id} />}
              {/* <BestPost forumId={params.id} /> */}
              <List />
              {/* E : Forum List */}
            </div>
            <div className="right_div">
              <WriteBtn forumId={params.id} />
              <SideImgBanner />
              <HistoryBanner setIsShow={setIsAllForum} setCategory={setCategory} />
              {/* <ForumListBanner /> */}
              <ForumCategoryBanner setIsShow={setIsAllForum} setCategory={setCategory} />
              <Top5Forums />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <AllForum isShow={isAllForum} setIsShow={setIsAllForum} category={category} />
    </div>
  );
}

export default Theme;
