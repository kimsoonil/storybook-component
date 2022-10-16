import { createSlice } from '@reduxjs/toolkit';

const initialState = () => ({
  snsId: '',
  isLoading: false,
  message: '',
  error: ''
});

const deleteSnsIdSlice = createSlice({
  name: 'deleteSnsId',
  initialState: initialState(),
  reducers: {
    reqDeleteSnsId: (state) => {
      Object.assign(state, initialState());
      state.isLoading = true;
    },
    deleteSnsIdSuccess: (state, { payload }) => {
      state.message = payload.message;
      state.isLoading = false;
    },
    deleteSnsIdFailure: (state, error) => {
      state.error = error.payload.message;
      state.isLoading = false;
    }
  }
});

export const { reqDeleteSnsId, deleteSnsIdSuccess, deleteSnsIdFailure } = deleteSnsIdSlice.actions;
export default deleteSnsIdSlice.reducer;
