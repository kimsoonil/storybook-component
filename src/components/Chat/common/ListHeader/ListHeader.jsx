import React from 'react';
import plusIcon from '../../../../html/img/ico/ic_plus_sm_bk.png';

function ListHeader({ title }) {
  return (
    <div className="list_header">
      <div className="title">
        <p>{title}</p>
        <button>
          <img src={plusIcon} alt="" />
        </button>
      </div>
      <div className="search_bar">
        <input placeholder="Search ..." />
      </div>
    </div>
  );
}

export default ListHeader;
