import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Main from './components/Main';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { fetchCheck, ICheckTocken } from './redux/reducers/ActionCreators';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const { auth } = useAppSelector((state) => state.authReducers);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  let userInfo: ICheckTocken;
  let id: string;
  const decoded = localStorage.getItem('token');
  if (decoded) {
    userInfo = jwt_decode(decoded);
    id = userInfo.userId;
  }

  useEffect(() => {
    !auth.isAuth && navigate('/');
    auth.isAuth && navigate('/main');
    dispatch(fetchCheck({ userId: id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuth]);

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

export default App;
