import axios from 'axios';

const API_ENDPOINT = 'https://www.omdbapi.com/?apikey=4a9c128b';

export const fetchMovies = async (movieName) => axios.get(`${API_ENDPOINT}&s=${movieName}`);

export const fetchMovie = async (movieId) => axios.get(`${API_ENDPOINT}&i=${movieId}`);

export const fetchReCapcha = async (token) => axios.post(`${process.env.REACT_APP_API_URL}/post`, { token });
