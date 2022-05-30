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
import { FormattedMessage } from 'react-intl';

interface IProps {
  open: boolean;
}

export const RenderModalCreateBoard = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [boardName, setBoardName] = useState('');
  const [boardDescription, setBoardDescription] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<IBoardForm> = () => {
    if (boardName === '') return;
    dispatch(toggleCreateBoardModalOpen(false));
    dispatch(fetchBoardsPostAll({ title: boardName, description: boardDescription })).then(
      (result) => {
        dispatch(addNewBoard(result.payload));
      }
    );
  };

  const handleClose = () => {
    dispatch(toggleCreateBoardModalOpen(false));
  };

  const handleChangeNameValue = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setBoardName(e.target.value);
  };

  const handleChangeDescriptionValue = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setBoardDescription(e.target.value);
  };

  return (
    <div className="create-board-modal">
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          <FormattedMessage id="create_board_title" />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormattedMessage id="create_board_description" />
          </DialogContentText>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={<FormattedMessage id="create_board_name_label" />}
              type="text"
              fullWidth
              variant="standard"
              value={boardName}
              {...register('name', {
                required: (
                  <FormattedMessage id="create_board_required_message" />
                ) as unknown as string,
              })}
              onChange={(event) => handleChangeNameValue(event)}
            />
            <div style={{ color: 'red' }}>{errors?.name && <p>{errors?.name?.message}</p>}</div>
            <TextField
              margin="dense"
              id="description"
              label={<FormattedMessage id="create_board_description_label" />}
              type="text"
              fullWidth
              variant="standard"
              value={boardDescription}
              {...register('description', {
                required: (
                  <FormattedMessage id="create_board_required_message" />
                ) as unknown as string,
              })}
              onChange={(event) => handleChangeDescriptionValue(event)}
            />
            <div style={{ color: 'red' }}>
              {errors?.description && <p>{errors?.description?.message}</p>}
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="cancel_btn" />
          </Button>
          <Button onClick={handleSubmit(onSubmit)}>
            <FormattedMessage id="create_btn" />
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
