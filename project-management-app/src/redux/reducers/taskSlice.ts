import { createSlice } from '@reduxjs/toolkit';
import React from 'react';
import { IInitialState } from '../../types/tasksSliceType';

const initialState: IInitialState = {
  tasksArr: [],
  task: {
    id: '',
    title: '',
    order: 0,
    description: '',
    userId: '',
    boardId: '',
    columnId: '',
  },
  statusApiTask: {
    isLoading: false,
    error: '',
  },
};

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: {},
  reducers: {},
});

export default taskSlice.reducer;
