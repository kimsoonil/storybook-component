/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import Header from 'components/common/header/Header';
import Footer from 'components/common/footer/Footer';
// import BookMark from 'components/Forum/Home/BookMark';
import BoardList from 'components/Forum/Home/BoardList/BoardList';
// import Chat from 'components/common/Chat/Chat';
import HistoryBanner from 'components/Forum/SideBanner/HistoryBanner';
// import clubTopbanner01Img from 'html/img/temp/club_top_banner_01.png';
// import clubTopbanner02Img from 'html/img/temp/club_top_banner_02.png';
// import clubTopbanner03Img from 'html/img/temp/club_top_banner_03.png';
import bannerTop01Img from 'html/img/com/forum_top_banner_01.png';
import bannerTop02Img from 'html/img/com/forum_top_banner_02.png';
import bannerTop03Img from 'html/img/com/forum_top_banner_03.png';
import post01Img from 'html/img/com/po_post_01.png';
import post02Img from 'html/img/com/po_post_02.png';
import post03Img from 'html/img/com/po_post_03.png';
import post04Img from 'html/img/com/po_post_04.png';
import post05Img from 'html/img/com/po_post_05.png';
import profileImg from 'html/img/com/profile.jpg';
import ForumRanking from './ForumRanking/ForumRanking';
import CreateForumBanner from '../SideBanner/CreateForumBanner';
// import PostRanking from './PostRanking/PostRanking';
import SideImgBanner from '../SideBanner/SideImgBanner';
import NewForums from '../SideBanner/NewForums';
import TodaysForum from '../SideBanner/TodaysForum';
import AllForum from '../AllForum/AllForum';
import TempSlide from './TempSlide';
// import po_post_01.png from ''

function Home() {
  const navigate = useNavigate();
  const [isAllForum, setIsAllForum] = useState(false);
  const { catList } = useSelector((state) => state.categoryList);
  return (
    <div id="wrap">
      <Header />
      <div id="main">
        <div className="forum_top_banner">
          <TempSlide>
            <img src={bannerTop01Img} alt="" />
            <img src={bannerTop02Img} alt="" />
            <img src={bannerTop03Img} alt="" />
            <img src={bannerTop01Img} alt="" />
            <img src={bannerTop02Img} alt="" />
            <img src={bannerTop03Img} alt="" />
          </TempSlide>
        </div>
        <div id="container">
          <div className="content_subtitle forum">
            <h2 className="h2Type eng">SUPER FORUM</h2>
            <button type="button" className="btn primary_line button_md view" onClick={() => setIsAllForum(true)}>
              <span>View All Forum</span>
            </button>
          </div>
          <div className="popular_post">
            <div className="content_subtitle">
              <h4 className="h4Type eng">Popular Posts</h4>
              <div className="title_menu">
                <button type="button" className="text_btn active">
                  <span>Live</span>
                </button>
                <button type="button" className="text_btn">
                  <span>Weekly</span>
                </button>
                <button type="button" className="text_btn">
                  <span>Monthly</span>
                </button>
              </div>
            </div>

            <div className="popular_post_con">
              <div className="popular_posts con01" onClick={() => navigate(`/forum/29/post/70`)} aria-hidden>
                <img src={post01Img} alt="" />
                <div className="popular_writer">
                  <div className="popular_writer_photo">
                    <img src={profileImg} alt="" />
                  </div>
                  <dl>
                    <dt>Nickname#USER02</dt>
                    <dd>30m ago</dd>
                  </dl>
                </div>
                <div className="popular_badge">
                  <span className="post_badge_best_big live" />
                </div>
                <div className="top_over" />
                <div className="popular_con">
                  <dl>
                    <dt>TWICE Break Down Their Favorite .. Snaks</dt>
                    <dd>
                      I would like to try each member’s favorite snack, but I just know it’s not available in our
                      country. The only thing I’ve tried is the Skittles which Mina mentioned. I’m hoping for more
                      interviews with complete members of TWICE or collaboration. I love OT9 so much. Although I would
                      normally follow Jihyo blindly, I have to say my favorite out of these is Sana’s choice. It’s like
                      coco crispies in pizza form. So good!
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="popular_posts con02" onClick={() => navigate(`/forum/30/post/52`)} aria-hidden>
                <img src={post02Img} alt="" />
                <div className="popular_writer">
                  <div className="popular_writer_photo">
                    <img src={profileImg} alt="" />
                  </div>
                  <dl>
                    <dt>Nickname#USER28</dt>
                    <dd>2h ago</dd>
                  </dl>
                </div>
                <div className="popular_badge">
                  <span className="post_badge_best_big weekly" />
                </div>
                <div className="top_over" />
                <div className="popular_con">
                  <dl>
                    <dt>LG’s batting lineup explodes…WIN! Woo-chan’s 100th career win</dt>
                    <dd>
                      LG Twins’ Cha Woo-chan easily won 100 games thanks to the explosion of the team’s batting lineup.
                      Cha Woo-chan gave up nine hits in five innings in the professional baseball game in Gwangju, but
                      became a winning pitc.. her by blocking well with two runs.LG defeated Kia 17-4, as the team’s
                      batting lineup exploded, and Cha Woo-chan became the 31st pitcher to win 100 games.
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="popular_flex">
                <div className="popular_posts con03" onClick={() => navigate(`/forum/32/post/214`)} aria-hidden>
                  <img src={post03Img} alt="" />
                  <div className="popular_writer">
                    <div className="popular_writer_photo">
                      <img src={profileImg} alt="" />
                    </div>
                    <dl>
                      <dt>Nickname#USER28</dt>
                      <dd>2h ago</dd>
                    </dl>
                  </div>
                  <div className="popular_badge">
                    <span className="post_badge_best_big monthly" />
                  </div>
                  <div className="top_over" />
                  <div className="popular_con">
                    <dl>
                      <dt>Adidas Has Officially Entered the Metaverse</dt>
                      <dd>
                        Including an NFT collection that features exclusive streetwe ar drops and access. In tandem with
                        Web3, Adidas has ma.. de its first NFT drop created with NFT pioneers Bored Ap.. e Yacht Club,
                        gmoney and the team behind PUNKS comic. Starting on December 17, the Adidas NFTs called Into the
                        Metaverse will be available for purchase and owners will then receive exclusive access to
                        various Adidas Originals experiences and products. With the NFTs acting as an access pass to
                        in-virtual land experiences as well as free collaborative merchandise, owners will be able to
                        access virtual wearables for the blockchain-based gaming world, The Sandbox.
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="popular_flex01">
                  <div className="popular_posts con04" onClick={() => navigate(`/forum/33/post/215`)} aria-hidden>
                    <img src={post04Img} alt="" />
                    <div className="popular_writer">
                      <div className="popular_writer_photo">
                        <img src={profileImg} alt="" />
                      </div>
                      <dl>
                        <dt>Nickname#USER28</dt>
                        <dd>2h ago</dd>
                      </dl>
                    </div>
                    <div className="popular_badge">
                      <span className="post_badge_best weekly" />
                    </div>
                    <div className="top_over" />
                    <div className="popular_con">Pokémon Holiday Collection | Pokémon Center Official Site</div>
                  </div>
                  <div className="popular_posts con05" onClick={() => navigate(`/forum/34/post/216`)} aria-hidden>
                    <img src={post05Img} alt="" />
                    <div className="popular_writer">
                      <div className="popular_writer_photo">
                        <img src={profileImg} alt="" />
                      </div>
                      <dl>
                        <dt>Nickname#USER28</dt>
                        <dd>2h ago</dd>
                      </dl>
                    </div>
                    <div className="popular_badge">
                      <span className="post_badge_best monthly" />
                    </div>
                    <div className="top_over" />
                    <div className="popular_con">What happens if you don’t give candy on Halloween Animal C..</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="main_div">
              <div className="con_div">
                <ForumRanking />
                {catList?.map((item) => (
                  <BoardList
                    title={item.title}
                    category={item.id}
                    forum_count={item.forum_count}
                    post_count={item.post_count}
                    comment_count={item.comment_count}
                    key={item.id}
                    setIsAllForum={setIsAllForum}
                  />
                ))}
              </div>
              <div className="right_div">
                <CreateForumBanner />
                {/* <Chat /> */}
                <SideImgBanner />
                <HistoryBanner />
                <NewForums />
                <TodaysForum />
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <AllForum isShow={isAllForum} setIsShow={setIsAllForum} />
    </div>
  );
}

export default Home;
