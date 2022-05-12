import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IInitialState, IBoardData } from '../../types/boardsSliceTypes';

const initialState: IInitialState = {
  board: [],
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    addNewBoard: (state, action: PayloadAction<IBoardData>) => {
      state.board.push(action.payload);
    }
  }
});

export default boardsSlice.reducer;
export const { addNewBoard } = boardsSlice.actions;