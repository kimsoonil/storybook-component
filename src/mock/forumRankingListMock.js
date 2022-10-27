const dummyList = [];
for (let i = 0; i < 10; i += 1) {
  dummyList[i] = {
    forumId: i + 1,
    img: '',
    badge: [],
    activeIndex: i * 100,
    forumName: i * 10 + i,
    forumComment: `test${i + 1}`,
    category: `category${i + 1}`
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
