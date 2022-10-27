import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  user: [],
  isLoading: false,
  message: '',
  error: ''
});

const searchUserSlice = createSlice({
  name: 'searchUser',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    reqsearchUser: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    searchUserSuccess: (state, { payload }) => {
      console.log(payload);
      state.user = payload.userList;
      // state.user = [{ id: 'test1' }, { id: 'test2' }, { id: 'test3' }, { id: 'test4' }, { id: 'test5' }];
      state.isLoading = false;
    },
    searchUserFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reset, reqsearchUser, searchUserSuccess, searchUserFailure } = searchUserSlice.actions;

export default searchUserSlice.reducer;
