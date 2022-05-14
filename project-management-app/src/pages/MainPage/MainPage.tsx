import React, { useEffect } from 'react';
import './MainPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchBoardsGetAll } from '../../redux/reducers/ActionCreators';
import { addAllBoards } from '../../redux/reducers/boardsSlice';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';
import DeleteIcon from '@mui/icons-material/Delete';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBoardsGetAll()).then((result) => {
      dispatch(addAllBoards(result.payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { board } = useAppSelector((state) => state.boardReducers);
  const handleMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ((event.target as HTMLDivElement).firstChild as HTMLOrSVGImageElement).classList
      ? ((event.target as HTMLDivElement).firstChild as HTMLOrSVGImageElement).classList.add(
          'active'
        )
      : false;
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ((event.target as HTMLDivElement).parentElement as HTMLDivElement).childNodes.forEach(
      (el: ChildNode) => {
        // console.log((el.firstChild as HTMLOrSVGImageElement) === null ? 'NULL' : false);
        (el.firstChild as HTMLOrSVGImageElement).classList
          ? (el.firstChild as HTMLOrSVGImageElement).classList.remove('active')
          : false;
      }
    );
  };

  return (
    <div className="main-page">
      {board.map((el) => {
        return (
          <div
            key={el.id}
            id={el.id}
            className="board"
            onMouseEnter={(event) => handleMouseOver(event)}
            onMouseLeave={(event) => handleMouseLeave(event)}
          >
            <DeleteIcon
              className="create-board-modal__delete"
              fontSize="small"
              color="action"
              // aria-hidden="false"
            />
            <p>{el.title}</p>
          </div>
        );
      })}
    </div>
  );
};
