export interface IAuth {
  name: string;
  login: string;
  password: string;
  userId: string; // то что декодируется из токена
  isAuth: boolean;
  error: string;
  isLoading: boolean;
  id: string; // то, что приходит в response при проверке токена при запросе на /useers/id
  errorLogin: string;
  token: string;
  allUsers: IAllUsers[];
}

export interface IInitialState {
  auth: IAuth;
}

export interface IAllUsers {
  id: string;
  name: string;
  login: string;
}
