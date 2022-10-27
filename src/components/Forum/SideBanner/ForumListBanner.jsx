import React from 'react';

function ForumListBanner() {
  return (
    <div className="category">
      <div className="content_subtitle">
        <h4 className="h4Type eng">Category</h4>
        <div className="title_menu">
          <button type="button" className="hover text_btn">
            <span>All forums</span>
          </button>
        </div>
      </div>
      <ul className="category_list">
        <li>
          <span className="category_name">Movie &amp; Art</span>
          <span className="category_level">28</span>
        </li>
        <li>
          <span className="category_name">Sports</span>
          <span className="category_level">2</span>
        </li>
        <li>
          <span className="category_name">Game</span>
          <span className="category_level">10</span>
        </li>
        <li>
          <span className="category_name">Food &amp; Cook</span>
          <span className="category_level">0</span>
        </li>
        <li>
          <span className="category_name">Simulation</span>
          <span className="category_level">1</span>
        </li>
        <li>
          <span className="category_name">NFTs</span>
          <span className="category_level">5</span>
        </li>
        <li>
          <span className="category_name">Tips and know-how</span>
          <span className="category_level">1</span>
        </li>
        <li>
          <span className="category_name">Pets</span>
          <span className="category_level">0</span>
        </li>
        <li>
          <span className="category_name">Celebrity</span>
          <span className="category_level">3</span>
        </li>
        <li>
          <span className="category_name">Event</span>
          <span className="category_level">8</span>
        </li>
      </ul>
    </div>
  );
}

export default ForumListBanner;
