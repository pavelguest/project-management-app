import { useForm, SubmitHandler } from 'react-hook-form';
import { IBoardForm } from '../../types/headerTypes';
import './CreateBoardModal.css';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
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

// axios.defaults.headers.common['Authorization'] =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIzYjNkNGEyNy1iMDg3LTRkM2QtOTM0OC0zZjg2ZmFhZmI2ZmEiLCJsb2dpbiI6InVzZXIxIiwiaWF0IjoxNjUyMTExMjY4fQ.EsmO7vXW5kUlyJjfy93YXYpB41p8z_AkQlqal1RGK6o';
interface IProps {
  open: boolean;
}

export const RenderModalCreateBoard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { createBoardModalOpen } = useAppSelector((state) => state.boardReducers);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors /*, isValid*/ },
  // } = useForm();
  // const onSubmit: SubmitHandler<IBoardForm> = (data) => {
  //   // console.log(data.title);
  //   dispatch(fetchBoardsPostAll(data)).then((result) => {
  //     dispatch(addNewBoard(result.payload));
  //   });
  // };
  // const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    // setOpen(true);
  };

  const handleClose = (props: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(props);
    // if (props === 'create') {
    //   // dispatch(fetchBoardsPostAll(data)).then((result) => {
    //   //   dispatch(addNewBoard(result.payload));
    //   // });
    // }
    dispatch(toggleCreateBoardModalOpen(false));

    // setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(event) => handleClose(event)}>Cancel</Button>
          <Button onClick={(event) => handleClose(event)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );

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
};

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
