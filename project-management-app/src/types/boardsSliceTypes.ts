import { ITaskObj } from './tasksSliceType';

export interface IInitialState {
  board: IBoardData[];
  currentBoard: ICurrentBoard;
  deleteModalOpen: boolean;
  createBoardModalOpen: boolean;
  boardToDeleteId: string;
  statusApi: {
    isLoading: boolean;
    error: string;
  };
}

export interface IBoardData {
  title: string;
  id: string;
}

export interface ICurrentBoard {
  title: string;
  id: string;
  columns: IColumnsArr[];
}
export interface IColumnsArr {
  id: string;
  title: string;
  order: number;
  tasks: ITaskObj[];
}

export interface ITasksArrAndColumnId {
  columnId: string;
  tasksArr: ITaskObj[];
}
export interface IMovedTasks {
  columnIdFrom: string;
  columnIdTo: string;
  columnTasksArrFrom: ITaskObj[];
  columnTasksArrTo: ITaskObj[];
}
