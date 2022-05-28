import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  IInitialState,
  IBoardData,
  ICurrentBoard,
  IColumnsArr,
  ITasksArrAndColumnId,
  IMovedTasks,
  IDeleteTask,
  IChangeColumnTitle,
  IChangeTask,
} from '../../types/boardsSliceTypes';
import { ITaskObj } from '../../types/tasksSliceType';
import { fetchCreateColumn, fetchCreateTask, fetchGetBoardId } from './ActionCreators';

const initialState: IInitialState = {
  board: [],
  currentBoard: {
    title: '',
    id: '',
    columns: [],
  },
  deleteModalOpen: false,
  createBoardModalOpen: false,
  boardToDeleteId: '',
  statusApi: {
    isLoading: false,
    error: '',
  },
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
    setBoardToDelete: (state, action: PayloadAction<string>) => {
      state.boardToDeleteId = action.payload;
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.board.map((el, index) => {
        if (el.id === action.payload) state.board.splice(index, 1);
      });
    },
    toggleDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.deleteModalOpen = action.payload;
    },
    toggleCreateBoardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.createBoardModalOpen = action.payload;
    },
    addNewColumn: (state, action: PayloadAction<IColumnsArr>) => {
      state.currentBoard.columns = [...state.currentBoard.columns, action.payload];
    },
    addColumns: (state, action: PayloadAction<IColumnsArr[]>) => {
      state.currentBoard.columns = action.payload;
    },
    addTasks: (state, action: PayloadAction<ITasksArrAndColumnId>) => {
      state.currentBoard.columns.forEach((elem) => {
        if (elem.id === action.payload.columnId) {
          elem.tasks = action.payload.tasksArr;
        }
      });
    },
    addMovedTasks: (state, action: PayloadAction<IMovedTasks>) => {
      state.currentBoard.columns.forEach((elem) => {
        if (elem.id === action.payload.columnIdFrom) {
          elem.tasks = action.payload.columnTasksArrFrom;
        }
        if (elem.id === action.payload.columnIdTo) {
          elem.tasks = action.payload.columnTasksArrTo;
        }
      });
    },
    changeColumnTitle: (state, action: PayloadAction<IChangeColumnTitle>) => {
      const indexColumnChange = state.currentBoard.columns.findIndex(
        (elem) => elem.id === action.payload.columnId
      );
      state.currentBoard.columns[indexColumnChange].title = action.payload.title;
    },
    changeTask: (state, action: PayloadAction<IChangeTask>) => {
      const indexColumn = state.currentBoard.columns.findIndex(
        (elem) => elem.id === action.payload.columnId
      );
      const indexTask = state.currentBoard.columns[indexColumn].tasks.findIndex(
        (elem) => elem.id === action.payload.taskId
      );
      if (action.payload.type === 'title') {
        state.currentBoard.columns[indexColumn].tasks[indexTask].title = action.payload.value;
      } else {
        state.currentBoard.columns[indexColumn].tasks[indexTask].description = action.payload.value;
      }
    },
    delColumn: (state, action: PayloadAction<string>) => {
      const indexDeleteColumn = state.currentBoard.columns.findIndex(
        (elem) => elem.id === action.payload
      );
      state.currentBoard.columns.splice(indexDeleteColumn, 1);
    },
    delTask: (state, action: PayloadAction<IDeleteTask>) => {
      const indexColumn = state.currentBoard.columns.findIndex(
        (elem) => elem.id === action.payload.columnId
      );
      const indexTask = state.currentBoard.columns[indexColumn].tasks.findIndex(
        (elem) => elem.id === action.payload.taskId
      );
      state.currentBoard.columns[indexColumn].tasks.splice(indexTask, 1);
    },
  },
  extraReducers: {
    [fetchGetBoardId.fulfilled.type]: (state, action: PayloadAction<ICurrentBoard>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = '';
      const sortColumnsArr = action.payload.columns.sort((a, b) => a.order - b.order);
      sortColumnsArr.map((elem) => elem.tasks.sort((a, b) => a.order - b.order));
      const copyArr = action.payload;
      copyArr.columns = [...sortColumnsArr];
      state.currentBoard = copyArr;
    },
    [fetchGetBoardId.pending.type]: (state) => {
      state.statusApi.isLoading = true;
    },
    [fetchGetBoardId.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = action.payload;
    },
    [fetchCreateColumn.fulfilled.type]: (state, action: PayloadAction<IColumnsArr>) => {
      const { id, title, order } = action.payload;
      state.statusApi.isLoading = false;
      state.statusApi.error = '';
      state.currentBoard.columns.push({ id: id, title: title, order: order, tasks: [] });
    },
    [fetchCreateColumn.pending.type]: (state) => {
      state.statusApi.isLoading = true;
    },
    [fetchCreateColumn.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = action.payload;
    },
    [fetchCreateTask.fulfilled.type]: (state, action: PayloadAction<ITaskObj>) => {
      const { columnId } = action.payload;
      state.statusApi.isLoading = false;
      state.statusApi.error = '';
      state.currentBoard.columns.forEach((elem) => {
        if (elem.id === columnId) {
          elem.tasks.push(action.payload);
        }
      });
    },
    [fetchCreateTask.pending.type]: (state) => {
      state.statusApi.isLoading = true;
    },
    [fetchCreateTask.rejected.type]: (state, action: PayloadAction<string>) => {
      state.statusApi.isLoading = false;
      state.statusApi.error = action.payload;
    },
  },
});

export default boardsSlice.reducer;
export const {
  addNewBoard,
  addAllBoards,
  deleteBoard,
  toggleDeleteModalOpen,
  setBoardToDelete,
  addNewColumn,
  addColumns,
  changeColumnTitle,
  changeTask,
  delColumn,
  delTask,
  addTasks,
  addMovedTasks,
  toggleCreateBoardModalOpen,
} = boardsSlice.actions;
