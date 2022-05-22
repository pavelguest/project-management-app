import { IBoardForm } from '../../types/headerTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '.';
import { IEditProps } from '../../types/editPropsTypes';
import { IDeleteColumn, ISetColumn } from '../../types/columnSliceType';
import { ICreateTask, IDeleteTask, IGetTasks } from '../../types/tasksSliceType';

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
    console.log(response.data);
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
const fetchDeleteColumn = createAsyncThunk(
  'columns/fetchDeleteColumn',
  async (props: IDeleteColumn, thunkAPI) => {
    try {
      const response = await $authHost.post(`boards/${props.boardId}/columns/${props.columnId}`);
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
const fetchDeleteTask = createAsyncThunk(
  'tasks/fetchCreateTask',
  async (props: IDeleteTask, thunkAPI) => {
    try {
      const response = await $authHost.post(
        `boards/${props.boardId}/columns/${props.columnId}/tasks/${props.taskId}`
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
  fetchDeleteColumn,
  fetchGetAllTasks,
  fetchCreateTask,
  fetchDeleteTask,
  fetchGetBoardId,
};
