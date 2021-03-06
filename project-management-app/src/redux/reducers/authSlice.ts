import { IAllUsers } from './../../types/authSliceType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAuth, IInitialState } from '../../types/authSliceType';
import { fetchRegistr, fetchLogin, fetchCheck, fetchEdit, fetchAllUsers } from './ActionCreators';

const initialState: IInitialState = {
  auth: {
    name: '',
    login: '',
    password: '',
    userId: '',
    isAuth: false,
    error: '', // ошибка при регистрации и проверке токена и получении всех юзеров
    isLoading: true,
    id: '',
    errorLogin: '', // ошибка при логине и изменении пароля/логина - для вывода в снэк бар
    token: '',
    allUsers: [],
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateIsAuth: (state, action: PayloadAction<boolean>) => {
      state.auth.isAuth = action.payload;
    },
  },
  extraReducers: {
    [fetchRegistr.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
      state.auth.isLoading = false;
      state.auth.error = '';
      state.auth.name = action.payload.name;
      state.auth.login = action.payload.login;
      state.auth.password = action.payload.password;
      // state.auth.isAuth = !!action.payload.name; //переводим в булево значение имя, если не пустая строка то будет тру
    },
    [fetchRegistr.pending.type]: (state) => {
      state.auth.isLoading = true;
    },
    [fetchRegistr.rejected.type]: (state, action: PayloadAction<string>) => {
      state.auth.isLoading = false;
      state.auth.error = action.payload;
    },
    [fetchLogin.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
      state.auth.isLoading = false;
      state.auth.errorLogin = '';
      state.auth.userId = action.payload.userId;
      state.auth.login = action.payload.login;
      state.auth.isAuth = !!action.payload.login;
      state.auth.token = action.payload.token;
    },
    [fetchLogin.pending.type]: (state) => {
      state.auth.isLoading = true;
    },
    [fetchLogin.rejected.type]: (state, action: PayloadAction<string>) => {
      state.auth.isLoading = false;
      state.auth.errorLogin = action.payload;
    },
    [fetchCheck.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
      state.auth.isLoading = false;
      state.auth.error = '';
      state.auth.id = action.payload.id;
      state.auth.name = action.payload.name;
      state.auth.login = action.payload.login;
      state.auth.isAuth = !!action.payload.login;
    },
    [fetchCheck.pending.type]: (state) => {
      state.auth.isLoading = true;
    },
    [fetchCheck.rejected.type]: (state, action: PayloadAction<string>) => {
      state.auth.isLoading = false;
      state.auth.error = action.payload;
    },
    [fetchEdit.fulfilled.type]: (state, action: PayloadAction<IAuth>) => {
      state.auth.isLoading = false;
      state.auth.errorLogin = '';
      state.auth.id = action.payload.id;
      state.auth.name = action.payload.name;
      state.auth.login = action.payload.login;
    },
    [fetchEdit.pending.type]: (state) => {
      state.auth.isLoading = true;
    },
    [fetchEdit.rejected.type]: (state, action: PayloadAction<string>) => {
      state.auth.isLoading = false;
      state.auth.errorLogin = action.payload;
    },
    [fetchAllUsers.fulfilled.type]: (state, action: PayloadAction<IAllUsers[]>) => {
      state.auth.isLoading = false;
      state.auth.allUsers = action.payload;
    },
    [fetchAllUsers.pending.type]: (state) => {
      state.auth.isLoading = true;
    },
    [fetchAllUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.auth.isLoading = false;
      state.auth.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const { updateIsAuth } = authSlice.actions;
