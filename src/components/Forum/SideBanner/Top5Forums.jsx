import React from 'react';
import rightThumb from 'html/img/com/banner_img04.png';

function Top5Forums() {
  return (
    <div className="top5">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Top 5 Forums</h4>
      </div>
      <ul className="top5_list">
        <li>
          <div className="top5_rank">
            <span className="rank_badge_xs gold" />
            <span className="ranknum up blank">5</span>
          </div>
          <div className="top5_img">
            <img src={rightThumb} alt="right" />
          </div>
          <span className="top5_name">SEOUL LG TWINS : wins Fan Board</span>
        </li>
        <li>
          <div className="top5_rank">
            <span className="rank_badge_xs silver" />
            <span className="ranknum hold blank">0</span>
          </div>
          <div className="top5_img">
            <img src={rightThumb} alt="right" />
          </div>
          <span className="top5_name">SEOUL LG TWINS : wins Fan Board</span>
        </li>
        <li>
          <div className="top5_rank">
            <span className="rank_badge_xs bronze" />
            <span className="ranknum down blank">2</span>
          </div>
          <div className="top5_img">
            <img src={rightThumb} alt="right" />
          </div>
          <span className="top5_name">SEOUL LG TWINS : wins Fan Board</span>
        </li>
        <li>
          <div className="top5_rank">
            <span className="rank_badge_xs normal">
              <span>4</span>
            </span>
            <span className="ranknum down blank">1</span>
          </div>
          <div className="top5_img">
            <img src={rightThumb} alt="right" />
          </div>
          <span className="top5_name">SEOUL LG TWINS : wins Fan Board</span>
        </li>
        <li>
          <div className="top5_rank">
            <span className="rank_badge_xs normal">
              <span>5</span>
            </span>
            <span className="ranknum hold blank">0</span>
          </div>
          <div className="top5_img">
            <img src={rightThumb} alt="right" />
          </div>
          <span className="top5_name">SEOUL LG TWINS : wins Fan Board</span>
        </li>
      </ul>
    </div>
  );
}

export default Top5Forums;
