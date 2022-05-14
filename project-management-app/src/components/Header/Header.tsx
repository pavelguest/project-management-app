import { NavLink } from 'react-router-dom';
import AuthorizationBtn from '../AuthorizationBtn';
import './Header.css';
import { RenderButton } from '../CreateBoard';
import { useAppSelector } from '../../hooks/redux';

export const Header = () => {
  const { auth } = useAppSelector((state) => state.authReducers);
  return (
    <header className="app-header">
      <div className="header__nav-wrapper">
        <nav className="header__nav">
          <NavLink to="/" className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}>
            Welcome
          </NavLink>
          {auth.isAuth && (
            <>
              <NavLink
                to="/main"
                className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
              >
                Main
              </NavLink>
              <NavLink
                to="/board"
                className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
              >
                Board
              </NavLink>
              <RenderButton />
            </>
          )}
        </nav>
        <AuthorizationBtn />
      </div>
    </header>
  );
};
