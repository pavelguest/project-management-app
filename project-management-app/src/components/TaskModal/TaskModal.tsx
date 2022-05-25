import { Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { ITaskObj } from '../../types/tasksSliceType';
import EditTask from '../EditTask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gap: 10,
};

export const TaskModal = (props: {
  isOpen: boolean;
  closeTask: () => void;
  editInput: (value: string, type: string) => void;
  task: ITaskObj;
}) => {
  const [isEditInputTitle, setIsEditInputTitle] = useState(false);
  const [isEditInputDescription, setIsEditInputDescription] = useState(false);
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.closeTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isEditInputTitle ? (
            <EditTask
              title={props.task.title}
              type={'title'}
              closeContainer={() => setIsEditInputTitle(false)}
              editTaskHandle={props.editInput}
            />
          ) : (
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              onClick={() => setIsEditInputTitle(true)}
            >
              Title: {props.task.title}
            </Typography>
          )}
          {isEditInputDescription ? (
            <EditTask
              title={props.task.description}
              type={'description'}
              closeContainer={() => setIsEditInputDescription(false)}
              editTaskHandle={props.editInput}
            />
          ) : (
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2 }}
              onClick={() => setIsEditInputDescription(true)}
            >
              Description: {props.task.description}
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};
