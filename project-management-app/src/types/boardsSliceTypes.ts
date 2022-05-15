export interface IInitialState {
  board: IBoardData[];
  deleteModalOpen: boolean;
}

export interface IBoardData {
  title: string;
  id?: string;
}
