import React, { useEffect } from 'react';
import './MainPage.css';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
  // fetchAllUsers,
  fetchBoardsGetAll,
  fetchGetBoardId,
} from '../../redux/reducers/ActionCreators';
import {
  addAllBoards,
  toggleDeleteModalOpen,
  setBoardToDelete,
} from '../../redux/reducers/boardsSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialogModal from '../../components/AlertDialogModal';
import { useNavigate } from 'react-router-dom';

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { board, deleteModalOpen } = useAppSelector((state) => state.boardReducers);
  useEffect(() => {
    dispatch(fetchBoardsGetAll()).then((result) => {
      dispatch(addAllBoards(result.payload));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMouseOverBoard = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLDivElement).className === 'board') {
      ((event.target as HTMLDivElement).firstChild as HTMLOrSVGImageElement).classList.add(
        'active'
      );
    }
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
    if ((event.target as HTMLDivElement).closest('div')) {
      dispatch(
        setBoardToDelete(((event.target as HTMLDivElement).closest('div') as HTMLDivElement).id)
      );
    }
    dispatch(toggleDeleteModalOpen(true));
  };
  const moveToCurrentBoard = (
    id: string,
    event: React.MouseEvent<HTMLElement, MouseEvent> | React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    if ((event.target as SVGSVGElement).closest('svg')) {
      return;
    }
    // dispatch(fetchAllUsers());
    dispatch(fetchGetBoardId(id));
    navigate('../board');
  };

  return (
    <div className="main-page">
      <div className="boards-wrapper">
        {board.map((el) => {
          return (
            <div
              key={el.id}
              id={el.id}
              className="board"
              onMouseEnter={(event) => handleMouseOverBoard(event)}
              onMouseLeave={(event) => handleMouseLeaveBoard(event)}
              onClick={(event) => moveToCurrentBoard(el.id, event)}
            >
              <DeleteIcon
                className="create-board-modal__delete"
                fontSize="small"
                color="action"
                onClick={(event) => handleDeleteBoardModal(event)}
              />
              <h3>{el.title}</h3>
              <p>{el.description}</p>
            </div>
          );
        })}
      </div>

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

// const handleDeleteBoard = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
//   if ((event.target as HTMLDivElement).closest('div')) {
//     const boardToDelete = (event.target as HTMLDivElement).closest('div') as HTMLDivElement;
//     dispatch(fetchBoardDelete(boardToDelete.id)).then((result) => {
//       console.log(result.meta.arg);
//       dispatch(deleteBoard(result.meta.arg));
//     });
//   }
// };
