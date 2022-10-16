import { createSlice } from '@reduxjs/toolkit';
import { MAX_LOCAL_HISTORY_SAVE } from 'constants/type';

const initialState = () => ({
  history: ['test1', 'test2', 'test3', 'test4', 'test5']
});

const forumHistorySlice = createSlice({
  name: 'forumHistory',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    setLogOutHistory: (state, { payload }) => {
      if (state.history.findIndex((item) => item === payload) === -1) {
        if (state.history.length === MAX_LOCAL_HISTORY_SAVE) {
          state.history.pop();
        }
        state.history = [...state.history, payload];
      }
    },
    delLogOutHistory: (state, { payload }) => {
      console.log(payload);
      state.history = state.history.filter((item) => item !== payload);
    }
  }
});

export const { reset, setLogOutHistory, delLogOutHistory } = forumHistorySlice.actions;

export default forumHistorySlice.reducer;
