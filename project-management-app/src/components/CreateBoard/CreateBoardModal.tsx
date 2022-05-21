import { useForm, SubmitHandler } from 'react-hook-form';
import { IBoardForm } from '../../types/headerTypes';
import './CreateBoardModal.css';
import { useAppDispatch } from '../../hooks/redux';
import { addNewBoard } from '../../redux/reducers/boardsSlice';
import { fetchBoardsPostAll } from '../../redux/reducers/ActionCreators';
import { toggleCreateBoardModalOpen } from '../../redux/reducers/boardsSlice';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core';

interface IProps {
  open: boolean;
}

// const useStyles = makeStyles({
//   dialog: {
//     position: 'absolute',
//     top: -150,
//     left: 0,
//   },
// });

export const RenderModalCreateBoard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [boardName, setBoardName] = useState('');
  const { handleSubmit } = useForm();

  const onSubmit: SubmitHandler<IBoardForm> = () => {
    if (boardName === '') return;
    dispatch(toggleCreateBoardModalOpen(false));
    dispatch(fetchBoardsPostAll({ title: boardName, description: '312321' })).then((result) => {
      dispatch(addNewBoard(result.payload));
    });
  };

  // const classes = useStyles();

  const handleClose = () => {
    dispatch(toggleCreateBoardModalOpen(false));
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  return (
    <div className="create-board-modal">
      <Dialog
        open={props.open}
        onClose={handleClose}
        // classes={{
        //   paper: classes.dialog,
        // }}
      >
        <DialogTitle>Create a board</DialogTitle>
        <DialogContent>
          <DialogContentText>
            A board is an aggregation of cards, arranged in lists. Use it for project managment,
            tracking or organizing of whatever you want.
          </DialogContentText>
          <form /* className="create-board-modal"*/ onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Board name"
              type="text"
              fullWidth
              variant="standard"
              value={boardName}
              onChange={(event) => handleChangeValue(event)}
              required={true}
              error={boardName === ''}
              helperText={boardName === '' ? 'Empty field!' : ' '}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit(onSubmit)}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// return (
//   <form className="create-board-modal" onSubmit={handleSubmit(onSubmit)}>
//     <label className="create-board-modal__label">
//       Create new board
//       <input
//         className="create-board-modal__input"
//         type="text"
//         {...register('title', {
//           required: 'Field has to be fulfilled',
//         })}
//       />
//       {errors.title && <p className="errors-message">{errors.title.message || 'error!'}</p>}
//     </label>
//     <button className="create-board-modal__btn">Create</button>
//   </form>
// );

// axios
//   .post('https://app-management-final.herokuapp.com/boards', {
//     title: data.title,
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// axios.defaults.headers.common['Authorization'] =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjNkNGEyNy1iMDg3LTRkM2QtOTM0OC0zZjg2ZmFhZmI2ZmEiLCJsb2dpbiI6InVzZXIxIiwiaWF0IjoxNjUyMTExMjY4fQ.EsmO7vXW5kUlyJjfy93YXYpB41p8z_AkQlqal1RGK6o';
