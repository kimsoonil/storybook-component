import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
import BookMark from 'components/Forum/Home/BookMark';
// import PostList2 from 'components/Forum/Home/ForumRanking/PostList2';
import BoardList from 'components/Forum/Home/BoardList/BoardList';
import Chat from 'components/common/Chat/Chat';
// import { reqForumRankingList } from 'redux/store/forum/forumRankingListSlice';
// import { reqForumList } from 'redux/store/forum/forumListSlice';
// import { reqForumBest } from 'redux/store/forum/forumBestSlice';

import ForumRanking from './ForumRanking/ForumRanking';
import CreateForumBanner from '../SideBanner/CreateForumBanner';

import PostRanking from './PostRanking/PostRanking';
import SideImgBanner from '../SideBanner/SideImgBanner';
import NewForums from '../SideBanner/NewForums';
import TodaysForum from '../SideBanner/TodaysForum';
import AllForum2 from '../AllForum/AllForum2';

function Home() {
  const [isAllForum, setIsAllForum] = useState(false);
  // const { bestList } = useSelector((state) => ({ ...state.forumBest }));
  // const [reqOption, setReqOption] = useState({ sort: 'live' });

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log(reqOption);
  //   dispatch(reqForumRankingList(reqOption));
  // }, [reqOption]);
  // BEST_LIVE
  // BEST_WEEKLY
  // BEST_MONTHLY
  // BEST_RISING
  // useEffect(() => {
  //   dispatch(reqForumBest({ best_forum_type: 'BEST_LIVE' }));
  // }, []);

  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div id="container">
          <div className="page_header">
            <h2 className="h2Type eng">SUPER FORUM</h2>
            <button type="button" className="btn primary_line button_md view" onClick={() => setIsAllForum(true)}>
              <span>View All Forum</span>
            </button>
          </div>
          <div className="main_div">
            <div className="con_div">
              <BookMark />
              <PostRanking />
              <ForumRanking />
              <BoardList title="Simulation" />
              <BoardList title="NFT" />
            </div>
            <div className="right_div">
              <CreateForumBanner />
              <Chat />
              <SideImgBanner />
              <NewForums />
              <TodaysForum />
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <AllForum2 isShow={isAllForum} setIsShow={setIsAllForum} />
    </div>
  );
}

export default Home;
