import axios from 'axios';
import { IBoardForm } from '../../types/headerTypes';
import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '.';

const fetchBoardsPostAll = createAsyncThunk(
  'boards/postAll',
  async (data: IBoardForm, thunkAPI) => {
    try {
      const response = await $authHost.post('https://app-management-final.herokuapp.com/boards', {
        title: data.title,
        id: data.id,
      });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(`${e}`);
    }
  }
);

const fetchBoardsGetAll = createAsyncThunk('boards/getAll', async (_, thunkAPI) => {
  try {
    const response = await $authHost.get('https://app-management-final.herokuapp.com/boards');
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
      const response = await $host.post(`https://app-management-final.herokuapp.com/signup`, {
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
      const response = await $authHost.post(`https://app-management-final.herokuapp.com/signin`, {
        login: props.login,
        password: props.password,
      });
      localStorage.setItem('token', response.data.token);
      return jwt_decode(response.data.token);
    } catch (e) {
      return thunkAPI.rejectWithValue('Ошибка авторизации! Повторите попытку');
    }
  }
);

// Получаем юзера по id, если без ошибки - значит токен валидный
const fetchCheck = createAsyncThunk('auth/fetchCheck', async (props: ICheckTocken, thunkAPI) => {
  try {
    const response = await $authHost.get(
      `https://app-management-final.herokuapp.com/users/${props.userId}`
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Unauthorized!');
  }
});

export { fetchBoardsPostAll, fetchBoardsGetAll, fetchRegistr, fetchLogin, fetchCheck };
