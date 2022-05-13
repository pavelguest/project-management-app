import { createAsyncThunk } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';
import { $authHost, $host } from '.';

interface TPropsAuthRespose {
  name: string;
  login: string;
  password: string;
}

export interface ICheckTocken {
  userId: string;
}

export const fetchRegistr = createAsyncThunk(
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

export const fetchLogin = createAsyncThunk(
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
export const fetchCheck = createAsyncThunk(
  'auth/fetchCheck',
  async (props: ICheckTocken, thunkAPI) => {
    try {
      const response = await $authHost.get(
        `https://app-management-final.herokuapp.com/users/${props.userId}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue('Unauthorized!');
    }
  }
);
