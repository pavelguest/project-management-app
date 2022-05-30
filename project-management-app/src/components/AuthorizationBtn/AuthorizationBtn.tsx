import { Button } from '@mui/material';
import React from 'react';
import { matchPath, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import './AuthorizationBtn.css';
import { updateIsAuth } from '../../redux/reducers/authSlice';
import HeaderMenu from '../HeaderMenu';
import { FormattedMessage } from 'react-intl';

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
              fontFamily: 'HanZi',
            }}
            onClick={logOut}
          >
            <FormattedMessage id="sign_out_btn" />
          </Button>
        )}
        {!auth.isAuth && !mainMatches && (
          <>
            <NavLink
              to="/registration"
              className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
            >
              <FormattedMessage id="sign_up_route" />
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
            >
              <FormattedMessage id="sign_in_route" />
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
              fontFamily: 'HanZi',
            }}
            onClick={() => navigate('/main')}
          >
            <FormattedMessage id="go_to_main_btn" />
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
