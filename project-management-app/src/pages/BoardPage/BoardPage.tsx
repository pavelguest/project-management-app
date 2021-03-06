import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import BoardContainer from '../../components/BoardComponents/BoardContainer';
import Preload from '../../components/Preload';
import { useAppSelector } from '../../hooks/redux';
import './BoardPage.css';

export const BoardPage = () => {
  const { statusApi } = useAppSelector((state) => state.boardReducers);
  return statusApi.isLoading ? (
    <Preload />
  ) : statusApi.error ? (
    <div>{statusApi.error}</div>
  ) : (
    <div className="board-page">
      <DndProvider
        backend={
          /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            ? TouchBackend
            : HTML5Backend
        }
      >
        <BoardContainer />
      </DndProvider>
    </div>
  );
};
