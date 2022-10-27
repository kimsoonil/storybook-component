const dummyList = [];
for (let i = 0; i < 10; i += 1) {
  dummyList[i] = {
    forumId: i,
    img: '',
    badge: [],
    commentCnt: i * 100,
    postsCnt: i * 10 + i,
    contents: `test${i}`,
    category: `category${i}`,
    masterImg: '',
    masterNick: 'tesetMaster',
    subsStatus: false
  };
}

export const results = {
  list: dummyList,
  totalResults: '637',
  Response: 'True'
};

export default {
  results
};
