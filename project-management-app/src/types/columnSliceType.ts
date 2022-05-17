export interface IColumns {
  id: string;
  title: string;
  order: number;
}

export interface ISetColumn {
  boardId: string;
  title: string;
  order: number;
}

export interface IInitialState {
  columnsArr: IColumns[];
  column: IColumns;
  statusApi: {
    isLoading: boolean;
    error: string;
  };
}
