import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import { FormattedMessage } from 'react-intl';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface IDelete {
  deleteItem: () => void;
}

export const AlertDialogDelete = (props: IDelete) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    setOpen(false);
    props.deleteItem();
  };

  return (
    <>
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          handleClickOpen();
        }}
        size={'small'}
      >
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <FormattedMessage id="alert_dialog_board_title" />
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>
            <FormattedMessage id="disagree_btn" />
          </Button>
          <Button onClick={handleDelete}>
            <FormattedMessage id="agree_btn" />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
