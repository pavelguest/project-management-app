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
  description: string;
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

export interface IPutTask {
  props: {
    boardId: string;
    columnId: string;
    taskId: string;
  };
  putTask: {
    title: string;
    order: number;
    description: string;
    userId: string;
    boardId: string;
    columnId: string;
  };
}
export interface IPutColumn {
  props: {
    boardId: string;
    columnId: string;
  };
  putColumn: {
    title: string;
    order: number;
  };
}
