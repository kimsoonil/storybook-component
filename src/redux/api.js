import axios from 'axios';

// const API_ENDPOINT = 'https://www.omdbapi.com/?apikey=4a9c128b';

// export const fetchMovies = async (movieName) => axios.get(`${API_ENDPOINT}&s=${movieName}`);

// export const fetchMovie = async (movieId) => axios.get(`${API_ENDPOINT}&i=${movieId}`);

// export const fetchReCapcha = async (token) => axios.post(`${process.env.REACT_APP_API_URL}/post`, { token });

const AEP = 'http://localhost:3001/';

export const fetchClub = async (id) => axios.get(`${AEP}club?id=${id}`);

// export const fetchMyClub = async (id) => axios.get(`${AEP}club?id=${id}`);
export const fetchMyClub = async () => {
  return new Promise((resolve, reject) => {
    resolve({
      status: 200,
      data: {
        name: 'admin',
        address: 'adress',
        category: 'Game',
        profile: {
          file: '',
          data: require('images/admin/club-master-profile.png')
        },
        banner: {
          file: '',
          data: require('images/admin/club-master-banner.png')
        },
        description: 'description',
        tags: [
          'tag1글씨는 이렇게',
          '태그2이이이이이이잉',
          '뉴진스가뭐임?',
          '나르시시스틱마갓알러빗서로를비춘밤',
          '놀러오세요동물의숲닌텐도정규식어떻게'
        ],
        autoApproval: 1,
        boardGroups: [{}]
      }
    });
  });
};
