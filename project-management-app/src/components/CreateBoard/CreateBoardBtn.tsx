import React from 'react';
import { RenderModalCreateBoard } from './CreateBoardModal';
import './CreateBoardBtn.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleCreateBoardModalOpen } from '../../redux/reducers/boardsSlice';

export function CreateBoardBtn() {
  const dispatch = useAppDispatch();
  const { createBoardModalOpen } = useAppSelector((state) => state.boardReducers);

  const handleToggleModal = () => {
    dispatch(toggleCreateBoardModalOpen(createBoardModalOpen ? false : true));
  };

  return (
    <div className="create-board-wrapper">
      <button className="create__btn" onClick={handleToggleModal}>
        Create
      </button>
      <RenderModalCreateBoard open={createBoardModalOpen} />
    </div>
  );
}

/* {showModal && <RenderModalCreateBoard />}
{showModal && <div className="overlay" onClick={handleToggleModal}></div>} */
