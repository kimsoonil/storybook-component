import { createSlice, current } from '@reduxjs/toolkit';
import { MAX_LOCAL_HISTORY_SAVE } from 'constants/type';

const initialState = () => ({
  history: []
});

const forumHistorySlice = createSlice({
  name: 'forumHistory',
  initialState: initialState(),
  reducers: {
    reset: (state) => {
      Object.assign(state, initialState());
    },
    setLogOutHistory: (state, { payload }) => {
      if (state.history.findIndex((item) => item.id === payload.id) === -1) {
        if (state.history.length === MAX_LOCAL_HISTORY_SAVE) {
          state.history.pop();
        }
        state.history = [...state.history, payload];
      }
    },
    delLogOutHistory: (state, { payload }) => {
      state.history = current(state.history).filter((item) => item.id !== payload);
    }
  }
});

export const { reset, setLogOutHistory, delLogOutHistory } = forumHistorySlice.actions;

export default forumHistorySlice.reducer;
