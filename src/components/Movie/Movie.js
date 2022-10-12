import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetMovie, getMovie } from 'redux/store/movieSlice';

function Movie() {
  const dispatch = useDispatch();
  const { movie } = useSelector((state) => ({ ...state.movieInfo }));
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(getMovie(id));
  }, [id]);

  const onResetMovie = () => {
    dispatch(resetMovie());
  };

  return (
    <section>
      <img src={movie?.Poster} alt={movie?.Title} />
      <div>
        <div align="left" variant="h3" component="h2">
          {movie?.Title}
        </div>
        <div align="left" variant="h5" component="h5">
          Year: {movie?.Year}
        </div>
        <div align="left" variant="body1" component="p">
          {movie?.Plot}
        </div>
        <div align="left" variant="h6" component="h6">
          Director: {movie?.Director}
        </div>
        <button variant="contained" onClick={() => navigate('/')}>
          Go Back
        </button>
        <button type="button" onClick={() => onResetMovie()}>
          reset
        </button>
      </div>
    </section>
  );
}

export default Movie;
