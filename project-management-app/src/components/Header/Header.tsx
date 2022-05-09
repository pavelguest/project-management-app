import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

export const Header = () => (
  <header className="app-header">
    <nav className="header__nav">
      <NavLink to="/" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
        Welcome
      </NavLink>
      <NavLink to="/main" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
        Main
      </NavLink>
      <NavLink to="/board" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
        Board
      </NavLink>
    </nav>
  </header>
);
