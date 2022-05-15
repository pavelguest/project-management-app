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
    },
    addAllBoards: (state, action: PayloadAction<IBoardData[]>) => {
      state.board = action.payload;
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.board.map((el, index) => {
        if (el.id === action.payload) state.board.splice(index, 1);
      });
    },
  },
});

export default boardsSlice.reducer;
export const { addNewBoard, addAllBoards, deleteBoard } = boardsSlice.actions;
