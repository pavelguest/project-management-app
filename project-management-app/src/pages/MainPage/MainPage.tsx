import React from 'react';
import './MainPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { board } = useAppSelector((state) => state.boardReducers);
  return (
    <div className="main-page">
      {board.map((el, index) => {
        return (
          <div key={el.id} id={el.id} className="board">
            <p>{el.title}</p>
          </div>
        );
      })}
    </div>
  );
};
