import { createSlice } from '@reduxjs/toolkit';
// import { MAX_LIST_COUNT } from 'constants/type';

// import Thumb01 from 'html/img/com/post_thumb_01.png';
// import ForumThumb01 from 'html/img/com/forum_thumb_01.png';

const initialState = () => ({
  id: 0,
  title: '',
  forum_category: '',
  discription: '',
  banner_image: '',
  thumbnail_image: '',
  forbidden_words: [],
  staffs: [],
  banned_users: [],
  badge: [],
  user: {
    username: ''
  },
  is_pined: false,
  message: '',
  error: '',
  isLoading: false
});

const forumInfoSlice = createSlice({
  name: 'forumInfo',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqForumInfo: (state) => {
      state.isLoading = true;
    },
    forumInfoSuccess: (state, { payload }) => {
      Object.assign(state, payload.data);
      // Object.assign(state.forbidden_words, ['test1', 'test2', 'test3']);
      // 시연 후 삭제
      for (let i = 0; i < 6; i += 1) {
        state.badge.push(Math.floor(Math.random() * 2));
      }
      state.isLoading = false;
    },
    updateForumInfo: (state, { payload }) => {
      if (payload.is_pined !== undefined) state.is_pined = payload.is_pined;
      state.isLoading = false;
    },
    forumInfoFailure: (state, error) => {
      console.log('error:::', error);
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumInfo, forumInfoSuccess, updateForumInfo, forumInfoFailure } = forumInfoSlice.actions;

export default forumInfoSlice.reducer;
