import { createSlice } from '@reduxjs/toolkit';
import { IInitialState } from '../../types/columnSliceType';

const initialState: IInitialState = {
  columnsArr: [],
  column: {
    id: '',
    title: '',
    order: 0,
  },
  statusApi: {
    isLoading: false,
    error: '',
  },
};

export const columnSlice = createSlice({
  name: 'columns',
  initialState,
  extraReducers: {},
  reducers: {},
});

export default columnSlice.reducer;
