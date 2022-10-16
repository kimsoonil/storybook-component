import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  subsStatus: false,
  isLoading: false,
  error: ''
});

const subscribeForumSlice = createSlice({
  name: 'subscribeForum',
  initialState: initialState(),
  reducers: {
    reqSubscribeForum: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    subscribeForumSuccess: (state, { payload }) => {
      console.log(payload.subsStatus);
      state.subsStatus = payload.subsStatus;
      state.isLoading = false;
    },
    subscribeForumFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqSubscribeForum, subscribeForumSuccess, subscribeForumFailure } = subscribeForumSlice.actions;

export default subscribeForumSlice.reducer;
