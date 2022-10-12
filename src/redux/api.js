// import axios from 'axios';
import axios from 'util/axios.config';

const API_ENDPOINT = 'https://www.omdbapi.com/?apikey=4a9c128b';

// Movie
export const fetchMovies = (movieName) => axios.get(`${API_ENDPOINT}&s=${movieName}`);
export const fetchMovie = (movieId) => axios.get(`${API_ENDPOINT}&i=${movieId}`);

// SignUp
export const fetchReCapcha = (token) => axios.post(`${process.env.REACT_APP_API_URL}/post`, { token });
// SignUp
export const fetchLogIn = (userInfo) => axios.post('https://www.mecallapi.com/api/login', JSON.stringify(userInfo));
// 삭제 예정
export const fetchAuthSns = (snsType) => window.open(`${process.env.REACT_APP_SNS_URL}/auth/${snsType}`, '_blank');

// Login
