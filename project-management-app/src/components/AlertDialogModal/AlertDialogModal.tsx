import React from 'react';
import './AlertDialogModal.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleDeleteModalOpen } from '../../redux/reducers/boardsSlice';
import { fetchBoardDelete } from '../../redux/reducers/ActionCreators';
import { deleteBoard } from '../../redux/reducers/boardsSlice';

interface IProps {
  open: boolean;
}

export const AlertDialogModal = (props: IProps) => {
  const dispatch = useAppDispatch();
  const { boardToDeleteId } = useAppSelector((state) => state.boardReducers);

  const handleClose = (props: string) => {
    dispatch(toggleDeleteModalOpen(false));
    if (props === 'confirm') {
      dispatch(fetchBoardDelete(boardToDeleteId)).then((result) => {
        dispatch(deleteBoard(result.meta.arg));
      });
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Whould you like to delete that board?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          After deleting you won&apos;t be able to restore all that board&apos;s data!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose('')}>Cancel</Button>
        <Button onClick={() => handleClose('confirm')} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
