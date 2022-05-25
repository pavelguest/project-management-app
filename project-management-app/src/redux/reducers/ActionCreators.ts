import { IBoardForm } from '../../types/headerTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '.';
import { IEditProps } from '../../types/editPropsTypes';
import { IDeleteColumn, ISetColumn } from '../../types/columnSliceType';
import { ICreateTask, IDeleteTask, IGetTasks } from '../../types/tasksSliceType';
import { IPutColumn, IPutTask } from '../../types/boardsSliceTypes';

const fetchBoardsPostAll = createAsyncThunk(
  'boards/postAll',
  async (data: IBoardForm, thunkAPI) => {
    try {
      const response = await $authHost.post(`boards`, {
        title: data.title,
        description: data.description,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(`${e}`);
    }
  }
);

const fetchBoardsGetAll = createAsyncThunk('boards/getAll', async (_, thunkAPI) => {
  try {
    const response = await $authHost.get(`boards`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(`${e}`);
  }
});

const fetchBoardDelete = createAsyncThunk('board/delete', async (boardId: string, thunkAPI) => {
  try {
    const response = await $authHost.delete(`boards/${boardId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(`${e}`);
  }
});

interface TPropsAuthRespose {
  name: string;
  login: string;
  password: string;
}

export interface ICheckTocken {
  userId: string;
}

const fetchRegistr = createAsyncThunk(
  'auth/fetchAuth',
  async (props: TPropsAuthRespose, thunkAPI) => {
    try {
      const response = await $host.post(`signup`, {
        name: props.name,
        login: props.login,
        password: props.password,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка регистрации! Повторите попытку');
    }
  }
);

const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (props: TPropsAuthRespose, thunkAPI) => {
    try {
      const response = await $authHost.post(`signin`, {
        login: props.login,
        password: props.password,
      });
      localStorage.setItem('token', response.data.token);
      return jwt_decode(response.data.token);
    } catch (e) {
      return thunkAPI.rejectWithValue('User was not founded!');
    }
  }
);

const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async (_, thunkAPI) => {
  try {
    const response = await $authHost.get(`users`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('User was not founded!');
  }
});

// Получаем юзера по id, если без ошибки - значит токен валидный
const fetchCheck = createAsyncThunk('auth/fetchCheck', async (props: ICheckTocken, thunkAPI) => {
  try {
    const response = await $authHost.get(`users/${props.userId}`);
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Unauthorized!');
  }
});

const fetchEdit = createAsyncThunk('auth/fetchEdit', async (props: IEditProps, thunkAPI) => {
  try {
    const response = await $authHost.put(`users/${props.id}`, {
      name: props.name,
      login: props.login,
      password: props.password,
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Ошибка! Повторите попытку');
  }
});

const fetchGetAllColumns = createAsyncThunk(
  'columns/fetchGetAllColumns',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await $authHost.get(`boards/${boardId}/columns`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const fetchCreateColumn = createAsyncThunk(
  'boards/fetchCreateColumn',
  async (props: ISetColumn, thunkAPI) => {
    try {
      const response = await $authHost.post(`boards/${props.boardId}/columns`, {
        title: props.title,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const fetchGetAllTasks = createAsyncThunk(
  'tasks/fetchGetAllTasks',
  async (props: IGetTasks, thunkAPI) => {
    try {
      const response = await $authHost.get(
        `boards/${props.boardId}/columns/${props.columnId}/tasks`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const fetchCreateTask = createAsyncThunk(
  'boards/fetchCreateTask',
  async (props: ICreateTask, thunkAPI) => {
    try {
      const response = await $authHost.post(
        `boards/${props.boardId}/columns/${props.columnId}/tasks`,
        {
          title: props.title,
          // order: props.order,
          description: props.description,
          userId: props.userId,
        }
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const fetchGetBoardId = createAsyncThunk(
  'boards/fetchGetBoardId',
  async (boardId: string, thunkAPI) => {
    try {
      const response = await $authHost.get(`boards/${boardId}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const fetchDeleteColumnId = createAsyncThunk(
  'boards/fetchDeleteColumnId',
  async (props: IDeleteColumn, thunkAPI) => {
    try {
      await $authHost.delete(`boards/${props.boardId}/columns/${props.columnId}`);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

const fetchDeleteTaskId = createAsyncThunk(
  'boards/fetchDeleteTaskId',
  async (props: IDeleteTask, thunkAPI) => {
    try {
      await $authHost.delete(
        `boards/${props.boardId}/columns/${props.columnId}/tasks/${props.taskId}`
      );
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);
const fetchPutTaskId = async (task: IPutTask) => {
  try {
    const response = await $authHost.put(
      `boards/${task.props.boardId}/columns/${task.props.columnId}/tasks/${task.props.taskId}`,
      {
        title: task.putTask.title,
        order: task.putTask.order,
        description: task.putTask.description,
        userId: task.putTask.userId,
        boardId: task.putTask.boardId,
        columnId: task.putTask.columnId,
      }
    );
    return response;
  } catch (e) {
    return console.log(e);
  }
};
const fetchPutColumnId = async (column: IPutColumn) => {
  try {
    const response = await $authHost.put(
      `boards/${column.props.boardId}/columns/${column.props.columnId}`,
      {
        title: column.putColumn.title,
        order: column.putColumn.order,
      }
    );
    return response;
  } catch (e) {
    return console.log(e);
  }
};

export {
  fetchBoardsPostAll,
  fetchBoardsGetAll,
  fetchBoardDelete,
  fetchRegistr,
  fetchLogin,
  fetchCheck,
  fetchEdit,
  fetchGetAllColumns,
  fetchCreateColumn,
  fetchGetAllTasks,
  fetchCreateTask,
  fetchGetBoardId,
  fetchDeleteColumnId,
  fetchDeleteTaskId,
  fetchPutTaskId,
  fetchPutColumnId,
  fetchAllUsers,
};
