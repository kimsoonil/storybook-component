import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMovieList } from 'redux/store/movieListSlice';

function Search() {
  const [name, setName] = useState('spider');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieList(name));
  }, [dispatch, name]);

  return (
    <>
      <h2>Movie Search App</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={name}
          minLength="4"
          maxLength="8"
          size="10"
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </>
  );
}

export default Search;
