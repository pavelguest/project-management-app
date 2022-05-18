export interface IGetTasks {
  boardId: string;
  columnId: string;
}
export interface IDeleteTask {
  boardId: string;
  columnId: string;
  taskId: string;
}
export interface ICreateTask {
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}
export interface ITask {
  id: string;
  boardId: string;
  columnId: string;
  title: string;
  order: number;
  description: string;
  userId: string;
}
export interface IInitialState {
  tasksArr: ITask[];
  task: ITask;
  statusApiTask: {
    isLoading: boolean;
    error: string;
  };
}
