/* eslint-disable */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPostsFeedInit } from 'redux/idistStore/postsSlice';
import { Loader } from 'components/idist/Loader';

function MyFeeds() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { feed } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getPostsFeedInit());
  }, [dispatch]);

  if (feed.message !== 'ok')
    return (
      <div className="root-center">
        <Loader />
      </div>
    );
  return feed.data.length !== 0 ? (
    <div className="side-box myFeeds">
      <div className="flex-between">
        <div className="side-box-title">New Feeds</div>
        <div className="see-all" onClick={() => navigate('/clubs/newfeeds')}>
          See all
        </div>
      </div>
      <div className="side-box-meun">
        <div className="myFeeds-content">
          {feed.data.map((feedItem, index) => (
            <div
              className="myFeeds-list"
              key={index}
              onClick={() => navigate(`/club/${feedItem.club}/post/${feedItem.id}`)}
            >
              <div className="myFeeds-list-item">
                <div className="myFeeds-list-item-name">{feedItem?.user?.username}</div>
                <div className="myFeeds-list-item-title">{feedItem?.title}</div>
                <div className="myFeeds-list-item-content">{feedItem?.content_summary}</div>
                <div className="myFeeds-list-item-info">
                  <img src={require('images/main/icon-user.png')} />
                  {feedItem?.visit_count}
                  <img src={require('images/main/ic-like.png')} alt="" style={{ marginLeft: '16px' }} />
                  {feedItem?.like_count}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="club-content-nodata"></div>
  );
}

export default MyFeeds;
