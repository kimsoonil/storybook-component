import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// import { useTranslation } from 'react-i18next';
import Header from 'components/common/header/Header';
import Banner from './Banner';
import BookMark from './BookMark';
import Summary from './Summary';
import AllForum from '../AllForum/AllForum';
import PostRanking from './PostRanking/PostRanking';
import ForumRanking from './ForumRanking/ForumRanking';

function Home() {
  const { history } = useSelector((state) => ({ ...state.forumHistory }));
  const [isForumListShow, setIsForumListShow] = useState(false);

  // const { t } = useTranslation();

  useEffect(() => {
    console.log(history);
  }, []);

  return (
    <>
      <Header />
      <Banner />
      <BookMark localHistory={history} />
      <Summary setIsShow={setIsForumListShow} />
      <PostRanking />
      <ForumRanking />
      <AllForum isShow={isForumListShow} setIsShow={setIsForumListShow} />
    </>
  );
}

export default Home;
