import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { IColumns, IInitialState } from '../../types/columnSliceType';
import { fetchCreateColumn, fetchGetAllColumns } from './ActionCreators';

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
  extraReducers: {
    [fetchGetAllColumns.fulfilled.type]: (state, action: PayloadAction<IColumns[]>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = '';
      console.log(`get`, action.payload);
      state.columnsArr = action.payload;
    },
    [fetchGetAllColumns.pending.type]: (state) => {
      state.statusApi.isLoading = true;
    },
    [fetchGetAllColumns.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = action.payload;
    },
    [fetchCreateColumn.fulfilled.type]: (state, action: PayloadAction<IColumns>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = '';
      console.log(`set`, action.payload);
      state.columnsArr = [...state.columnsArr, action.payload];
    },
    [fetchCreateColumn.pending.type]: (state) => {
      state.statusApi.isLoading = true;
    },
    [fetchCreateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = action.payload;
    },
  },
  reducers: {
    addColumns: (state, action: PayloadAction<IColumns[]>) => {
      state.columnsArr = action.payload;
    },
  },
});

export default columnSlice.reducer;
