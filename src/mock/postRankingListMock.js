const dummyList = [];
for (let i = 0; i < 10; i += 1) {
  dummyList[i] = {
    postId: i,
    forumName: `forum ${i}`,
    postName: `post ${i}`,
    img: '',
    badge: [],
    commentCnt: i * 100,
    likeCnt: i * 10 + i,
    viewCnt: i * 10 + i,
    contents: `test${i}`,
    category: `category${i}`,
    isLiked: false,
    masterImg: '',
    masterNick: 'tesetMaster'
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
