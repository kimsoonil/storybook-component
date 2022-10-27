import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

function Search({ action }) {
  const [keyWord, setKeyWord] = useState('');
  const dispatch = useDispatch();

  const onSearch = () => {
    dispatch(action(keyWord));
  };
  return (
    <div>
      <span className="form_title">Add a Staff</span>
      <div className="form_wrap msg">
        <span className="form_cell form_input input_lg">
          <input type="text" placeholder="Search a Member" onChange={(e) => setKeyWord(e.target.value)} />
          <button className="btn_input input_search" onClick={onSearch}>
            <span className="a11y">검색</span>
          </button>
        </span>
      </div>
    </div>
  );
}
export default Search;
