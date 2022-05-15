import React, { useEffect } from 'react';
import './AlertDialogModal.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleDeleteModalOpen } from '../../redux/reducers/boardsSlice';

interface IProps {
  open: boolean;
}

export const AlertDialogModal = (props: IProps) => {
  const dispatch = useAppDispatch();
  // const { deleteModalOpen } = useAppSelector((state) => state.boardReducers);

  const handleClickOpen = () => {};

  const handleClose = () => {
    dispatch(toggleDeleteModalOpen(false));
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous location data to
          Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Disagree</Button>
        <Button onClick={handleClose} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};
