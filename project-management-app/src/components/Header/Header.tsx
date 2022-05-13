import { NavLink } from 'react-router-dom';
import AuthorizationBtn from '../AuthorizationBtn';
import './Header.css';
import { RenderButton } from '../CreateBoard';

export const Header = () => (
  <header className="app-header">
    <div className="header__nav-wrapper">
      <nav className="header__nav">
        <NavLink to="/" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
          Welcome
        </NavLink>
        <NavLink to="/main" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
          Main
        </NavLink>
        <NavLink
          to="/board"
          className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
        >
          Board
        </NavLink>
      </nav>
      <RenderButton />
      <AuthorizationBtn />
    </div>
  </header>
);
