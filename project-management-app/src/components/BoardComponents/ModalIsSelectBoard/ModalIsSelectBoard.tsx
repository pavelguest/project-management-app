import React from 'react';

import { useAppSelector } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';
import BoardPage from '../../../pages/BoardPage';
import { RenderModal } from './RenderModal';

export const ModalIsSelectBoard = () => {
  const { currentBoard } = useAppSelector((state) => state.boardReducers);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
    navigate('/main');
  };

  return currentBoard.id === '' ? (
    <RenderModal handleClose={handleClose} open={open} />
  ) : (
    <BoardPage />
  );
};
