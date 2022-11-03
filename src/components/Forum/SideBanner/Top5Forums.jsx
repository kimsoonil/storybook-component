import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { reqForumRankingList } from 'redux/store/forum/forumRankingListSlice';
import classNames from 'classnames';

function Top5Forums() {
  const { rankingList } = useSelector((state) => ({ ...state.forumRankingList }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reqForumRankingList({ page: 1, page_size: 5 }));
  }, []);
  return (
    <div className="top5">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Top 5 Forums</h4>
      </div>
      <ul className="top5_list">
        {rankingList?.map((item, idx) => (
          <li key={item.id} onClick={() => navigate(`/forum/${item.id}/theme`)} aria-hidden>
            <div className="top5_rank">
              <span
                className={classNames(
                  'rank_badge_xs',
                  { gold: idx === 0 },
                  { silver: idx === 1 },
                  { bronze: idx === 2 },
                  { normal: idx > 2 }
                )}
              >
                {idx > 2 && <span>{idx + 1}</span>}
              </span>
              <span className="ranknum up blank">{Math.floor(Math.random() * 5) + 1}</span>
            </div>
            <div className="top5_img">
              <img src={item.thumbnail_image} alt="right" />
            </div>
            <span className="top5_name">{item.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Top5Forums;
