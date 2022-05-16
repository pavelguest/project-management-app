import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import BoardContainer from '../../components/BoardComponents/BoardContainer';
import './BoardPage.css';

const isMobile = window.innerWidth < 600;

export const BoardPage = () => (
  <div className="board-page">
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <BoardContainer />
    </DndProvider>
  </div>
);
