import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MoviesList() {
  const { moviesList } = useSelector((state) => ({ ...state.movie }));
  return (
    <div>
      <div>
        <div>
          <div>
            {moviesList?.Search?.map((item) => (
              <div key={item.imdbID}>
                <div>
                  <Link to={`/movie/${item.imdbID}`}>
                    <img component="img" height="350" src={item.Poster} alt={item.Title} />
                    <div>
                      <div>({item.Year})</div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoviesList;
