import React from 'react';
import { RenderModalCreateBoard } from './CreateBoardModal';
import './CreateBoardBtn.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleCreateBoardModalOpen } from '../../redux/reducers/boardsSlice';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export function CreateBoardBtn() {
  const dispatch = useAppDispatch();
  const { createBoardModalOpen } = useAppSelector((state) => state.boardReducers);
  const location = useLocation();

  const handleToggleModal = () => {
    dispatch(toggleCreateBoardModalOpen(createBoardModalOpen ? false : true));
  };

  return (
    <div className="create-board-wrapper">
      {location.pathname === '/main' && (
        <Button
          variant="contained"
          style={{
            whiteSpace: 'nowrap',
            boxShadow: '1px 1px 10px 1px #000a',
            backgroundColor: 'var(--blue)',
          }}
          onClick={handleToggleModal}
        >
          <FormattedMessage id="create_btn" />
        </Button>
        // <button className="create__btn" onClick={handleToggleModal}>
        //   Create
        // </button>
      )}
      <RenderModalCreateBoard open={createBoardModalOpen} />
    </div>
  );
}

/* {showModal && <RenderModalCreateBoard />}
{showModal && <div className="overlay" onClick={handleToggleModal}></div>} */
