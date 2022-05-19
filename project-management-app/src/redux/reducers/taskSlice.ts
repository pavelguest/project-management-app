import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import React from 'react';
import { IInitialState, ITask } from '../../types/tasksSliceType';
import { fetchCreateTask, fetchGetAllTasks } from './ActionCreators';

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
  extraReducers: {
    [fetchGetAllTasks.fulfilled.type]: (state, action: PayloadAction<ITask[]>) => {
      state.statusApiTask.isLoading = false;
      state.statusApiTask.error = '';
      console.log(`get`, action.payload);
      state.tasksArr = action.payload;
    },
    [fetchGetAllTasks.pending.type]: (state) => {
      state.statusApiTask.isLoading = true;
    },
    [fetchGetAllTasks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApiTask.isLoading = false;
      state.statusApiTask.error = action.payload;
    },
    [fetchCreateTask.fulfilled.type]: (state, action: PayloadAction<ITask>) => {
      state.statusApiTask.isLoading = false;
      state.statusApiTask.error = '';
      console.log(`set`, action.payload);
      state.tasksArr = [...state.tasksArr, action.payload];
    },
    [fetchCreateTask.pending.type]: (state) => {
      state.statusApiTask.isLoading = true;
    },
    [fetchCreateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApiTask.isLoading = false;
      state.statusApiTask.error = action.payload;
    },
  },
  reducers: {
    addTasks: (state, action: PayloadAction<ITask[]>) => {
      state.tasksArr = action.payload;
    },
  },
});

export default taskSlice.reducer;
