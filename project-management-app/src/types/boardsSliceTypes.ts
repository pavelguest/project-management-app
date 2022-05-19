import { WritableDraft } from 'immer/dist/internal';

export interface IInitialState {
  board: IBoardData[];
  deleteModalOpen: boolean;
  createBoardModalOpen: boolean;
  boardToDeleteId: string;
}

export interface IBoardData {
  title: string;
  id?: string;
}
