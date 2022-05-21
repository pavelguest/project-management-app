import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './HeaderMenu.css';
import { useNavigate, useLocation } from 'react-router-dom';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

interface IHeaderMenu {
  type: string;
}

export const HeaderMenu = (props: IHeaderMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [anchorElAuth, setAnchorElAuth] = React.useState<null | SVGSVGElement>(null);
  const openAuth = Boolean(anchorElAuth);
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickAuth = (event: React.MouseEvent<SVGSVGElement>) => {
    setAnchorElAuth(event.currentTarget);
  };
  const handleClose = (props: string) => {
    switch (props) {
      case 'welcome':
        navigate('/');
        break;
      case 'main':
        navigate('/main');
        break;
      case 'board':
        navigate('/board');
        break;
      case 'edit-profile':
        navigate('/edit');
        break;
    }
    setAnchorEl(null);
  };

  const handleCloseAuth = (props: string) => {
    setAnchorElAuth(null);
  };
  console.log(props.type);

  return (
    <div className="more-menu">
      {props.type === 'nav-menu' && (
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          style={{
            color: 'white',
          }}
        >
          More
        </Button>
      )}
      {(props.type === 'auth-done-main' ||
        props.type === 'auth-done-not-main' ||
        props.type === 'auth-not-done') && (
        <AccountBoxIcon
          color="primary"
          fontSize="large"
          onClick={(event) => handleClickAuth(event)}
        />
      )}
      {props.type === 'nav-menu' && (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => handleClose('welcome')}
            selected={location.pathname === '/' ? true : false}
          >
            Welcome
          </MenuItem>
          <MenuItem
            onClick={() => handleClose('main')}
            selected={location.pathname === '/main' ? true : false}
          >
            Main
          </MenuItem>
          <MenuItem
            onClick={() => handleClose('board')}
            selected={location.pathname === '/board' ? true : false}
          >
            Board
          </MenuItem>
          <MenuItem
            onClick={() => handleClose('edit-profile')}
            selected={location.pathname === '/edit' ? true : false}
          >
            Edit profile
          </MenuItem>
        </Menu>
      )}
      {(props.type === 'auth-done-main' ||
        props.type === 'auth-done-not-main' ||
        props.type === 'auth-not-done') && (
        <Menu
          id="basic-menu-auth"
          anchorEl={anchorElAuth}
          open={openAuth}
          onClose={handleCloseAuth}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem
            onClick={() => handleClose('sign-up')}
            disabled={props.type !== 'auth-not-done' ? true : false}
          >
            Sign Up
          </MenuItem>
          <MenuItem
            onClick={() => handleClose('sign-in')}
            disabled={props.type !== 'auth-not-done' ? true : false}
          >
            Sign In
          </MenuItem>
          <MenuItem
            onClick={() => handleClose('sign-out')}
            disabled={props.type === 'auth-not-done' ? true : false}
          >
            Sign Out
          </MenuItem>
          <MenuItem
            onClick={() => handleClose('go-to-main')}
            disabled={props.type === 'auth-done-not-main' ? false : true}
          >
            Main page
          </MenuItem>
        </Menu>
      )}
    </div>
  );
};

// PaperProps={{
//   style: {
//     color: 'white',
//   },
// }}
