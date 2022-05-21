import { NavLink } from 'react-router-dom';
import AuthorizationBtn from '../AuthorizationBtn';
import './Header.css';
import { CreateBoardBtn } from '../CreateBoard';
import { useAppSelector } from '../../hooks/redux';
import EditBtn from '../EditBth/EditBtn';
import HeaderMenu from '../HeaderMenu';

export const Header = () => {
  const { auth } = useAppSelector((state) => state.authReducers);

  return (
    <header className="app-header">
      <div className="header__nav-wrapper">
        <HeaderMenu type={'nav-menu'} />
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
              <NavLink
                to="/edit"
                className={({ isActive }) => 'nav__link' + (isActive ? ' active' : '')}
              >
                <EditBtn />
              </NavLink>
            </>
          )}
        </nav>
        <CreateBoardBtn />
      </div>
      <AuthorizationBtn />
    </header>
  );
};

// type Timeout = ReturnType<typeof setTimeout>;

// window.addEventListener('resize', resizeThrottler, false);

// let resizeTimeout: null | Timeout;
// function resizeThrottler() {
//   if (!resizeTimeout) {
//     resizeTimeout = setTimeout(function () {
//       resizeTimeout = null;
//       actualResizeHandler();
//     }, 66);
//   }
// }

// function actualResizeHandler() {
//   console.log('resized' + window.screen.width);
// }
