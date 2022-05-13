import React, { useEffect } from 'react';
import './MainPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchBoardsGetAll } from '../../redux/reducers/ActionCreators';
import { addAllBoards } from '../../redux/reducers/boardsSlice';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoardsGetAll()).then((result) => {
      dispatch(addAllBoards(result.payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { board } = useAppSelector((state) => state.boardReducers);
  return (
    <div className="main-page">
      {board.map((el) => {
        return (
          <div key={el.id} id={el.id} className="board">
            <p>{el.title}</p>
          </div>
        );
      })}
    </div>
  );
};
