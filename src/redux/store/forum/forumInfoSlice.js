import { createSlice } from '@reduxjs/toolkit';
// import { MAX_LIST_COUNT } from 'constants/type';

// import Thumb01 from 'html/img/com/post_thumb_01.png';
// import ForumThumb01 from 'html/img/com/forum_thumb_01.png';

const initialState = () => ({
  id: 0,
  title: '',
  forum_category: 0,
  discription: '',
  master_nickname: '',
  banner_image: '',
  thumbnail_image: '',
  forbidden_words: [],
  staffs: [],
  banned_users: [],
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
      console.log('forumInfoSuccess slice::', payload);
      Object.assign(state, payload.data);
      Object.assign(state.forbidden_words, ['test1', 'test2', 'test3']);
      state.isLoading = false;
    },
    forumInfoFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqForumInfo, forumInfoSuccess, forumInfoFailure } = forumInfoSlice.actions;

export default forumInfoSlice.reducer;
