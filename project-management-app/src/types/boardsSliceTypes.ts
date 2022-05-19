import { ITask } from './tasksSliceType';

export interface IInitialState {
  board: IBoardData[];
  currentBoard: ICurrentBoard;
  deleteModalOpen: boolean;
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
  tasks: ITask[];
}
