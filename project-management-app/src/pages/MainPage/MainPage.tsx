import React, { useEffect } from 'react';
import './MainPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchBoardDelete, fetchBoardsGetAll } from '../../redux/reducers/ActionCreators';
import { addAllBoards, deleteBoard, toggleDeleteModalOpen } from '../../redux/reducers/boardsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialogModal from '../../components/AlertDialogModal';

export const MainPage = () => {
  const dispatch = useAppDispatch();
  const { board, deleteModalOpen } = useAppSelector((state) => state.boardReducers);
  useEffect(() => {
    dispatch(fetchBoardsGetAll()).then((result) => {
      dispatch(addAllBoards(result.payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseOverBoard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // ((event.target as HTMLDivElement).firstChild as HTMLOrSVGImageElement).classList
    (event.target as HTMLDivElement).className === 'board'
      ? ((event.target as HTMLDivElement).firstChild as HTMLOrSVGImageElement).classList.add(
          'active'
        )
      : false;
  };

  const handleMouseLeaveBoard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    ((event.target as HTMLDivElement).parentElement as HTMLDivElement).childNodes.forEach(
      (el: ChildNode) => {
        const deleteBtn = el.firstChild as HTMLOrSVGImageElement;
        if ((el as HTMLDivElement).className === 'board') {
          deleteBtn.classList.remove('active');
        }
      }
    );
  };

  const handleDeleteBoardModal = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    dispatch(toggleDeleteModalOpen(true));
  };

  const handleDeleteBoard = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).closest('div')) {
      const boardToDelete = (event.target as HTMLDivElement).closest('div') as HTMLDivElement;
      dispatch(fetchBoardDelete(boardToDelete.id)).then((result) => {
        console.log(result.meta.arg);
        dispatch(deleteBoard(result.meta.arg));
      });
    }
  };

  return (
    <div className="main-page">
      {board.map((el) => {
        return (
          <div
            key={el.id}
            id={el.id}
            className="board"
            onMouseEnter={(event) => handleMouseOverBoard(event)}
            onMouseLeave={(event) => handleMouseLeaveBoard(event)}
          >
            <DeleteIcon
              className="create-board-modal__delete"
              fontSize="small"
              color="action"
              onClick={(event) => handleDeleteBoardModal(event)}
            />
            <p>{el.title}</p>
          </div>
        );
      })}
      <AlertDialogModal open={deleteModalOpen} />
    </div>
  );
};

// const boardToDelete = (event.target as HTMLDivElement).closest('div') ? (event.target as HTMLDivElement).closest('div') : false;
// console.log(
//   (event.target as HTMLDivElement).closest('div') !== null
//     ? (event.target as HTMLDivElement).closest('div').id
//     : false
// );
