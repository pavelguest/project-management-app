import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/boardsSliceTypes';

const initialState: IInitialState = {
  board: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addNewBoard: (state, action) => {
      state.board.push(action.payload);
    }
  }
});

export default boardsSlice.reducer;
