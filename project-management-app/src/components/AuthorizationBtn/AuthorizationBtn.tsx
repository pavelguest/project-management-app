import { Button } from '@mui/material';
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './AuthorizationBtn.css';

const AuthorizationBtn = () => {
  const navigate = useNavigate();
  return (
    <div className="autoriz-wrap">
      <NavLink
        to="/registration"
        className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
      >
        Sign Up
      </NavLink>
      <NavLink to="/login" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
        Sign In
      </NavLink>
      <Button
        variant="contained"
        color="primary"
        style={{ whiteSpace: 'nowrap', boxShadow: '1px 1px 10px 1px #000a' }}
        onClick={() => navigate('/')}
      >
        Sign Out
      </Button>
    </div>
  );
};

export default AuthorizationBtn;
