import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './HeaderMenu.css';
import { useNavigate } from 'react-router-dom';

export const HeaderMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
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

  return (
    <div className="more-menu">
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        More
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => handleClose('welcome')}>Welcome</MenuItem>
        <MenuItem onClick={() => handleClose('main')}>Main</MenuItem>
        <MenuItem onClick={() => handleClose('board')}>Board</MenuItem>
        <MenuItem onClick={() => handleClose('edit-profile')}>Edit profile</MenuItem>
      </Menu>
    </div>
  );
};
