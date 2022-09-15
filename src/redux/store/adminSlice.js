import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  boards: {
    selected: { type: -1, id: -1 }
  }
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialState(),
  reducers: {
    /**
     * @param {Object} state - redux의 admin 객체
     * @param {Object} payload
     * @param {string} payload.state - initialState의 depth 1 객체 이름
     * @param {Object} payload.data - 업데이트 할 데이터
     */
    resetAdmin: (state, { payload, type }) => {
      console.log(type, '액션 실행');
      state[payload.state] = initialState()[payload.state];
    },
    changeAdmin: (state, { payload, type }) => {
      console.log(type, '액션 실행');
      state[payload.state] = payload.data;
    },
    updateAdmin: (state, { payload, type }) => {
      console.log(type, '액션 실행');
      const prevState = JSON.parse(JSON.stringify(state[payload.state]));
      state[payload.state] = { ...prevState, ...payload.data };
    },

    setAdminBoards: (state, { payload }) => {
      if (typeof payload === 'function') {
        const prevState = JSON.parse(JSON.stringify(state.boards));
        state.boards = payload(prevState);
      } else {
        state.boards = payload;
      }
    }
  }
});

export const { resetAdmin, changeAdmin, updateAdmin, setAdminBoards } = adminSlice.actions;

export default adminSlice.reducer;
