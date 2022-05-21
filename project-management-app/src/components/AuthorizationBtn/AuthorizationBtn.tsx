import { Button } from '@mui/material';
import React from 'react';
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './AuthorizationBtn.css';
import { updateIsAuth } from '../../redux/reducers/authSlice';
import HeaderMenu from '../HeaderMenu';

export const AuthorizationBtn = () => {
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state.authReducers);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const mainMatches = matchPath({ path: '/main', end: true }, location.pathname);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(updateIsAuth(false));
    navigate('/');
  };

  return (
    <div>
      <div className="authorization-wrapper">
        {auth.isAuth && (
          <Button
            variant="contained"
            style={{
              whiteSpace: 'nowrap',
              boxShadow: '1px 1px 10px 1px #000a',
              backgroundColor: 'var(--blue)',
            }}
            onClick={logOut}
          >
            Sign Out
          </Button>
        )}
        {!auth.isAuth && !mainMatches && (
          <>
            <NavLink
              to="/registration"
              className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
            >
              Sign&nbsp;Up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
            >
              Sign&nbsp;In
            </NavLink>
          </>
        )}
        {auth.isAuth && !mainMatches && (
          <Button
            variant="contained"
            style={{
              whiteSpace: 'nowrap',
              boxShadow: '1px 1px 10px 1px #000a',
              backgroundColor: 'var(--blue)',
            }}
            onClick={() => navigate('/main')}
          >
            Go to main page
          </Button>
        )}
      </div>
      <div className="account-box-icon">
        <HeaderMenu type="auth-menu" />
      </div>
    </div>
  );
};

export default AuthorizationBtn;
