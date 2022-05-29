import { IconButton, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ITaskObj } from '../../types/tasksSliceType';
import EditIcon from '@mui/icons-material/Edit';
import EditTask from '../EditTask';
import './TaskModal.css';
import { useAppSelector } from '../../hooks/redux';

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
  justifyContent: 'flex-start',
  gap: 5,
};

export const TaskModal = (props: {
  isOpen: boolean;
  closeTask: () => void;
  editInput: (value: string, type: string) => void;
  task: ITaskObj;
}) => {
  const [isEditInputTitle, setIsEditInputTitle] = useState(false);
  const [isEditInputDescription, setIsEditInputDescription] = useState(false);
  const { auth } = useAppSelector((state) => state.authReducers);
  return (
    <div>
      <Modal
        open={props.isOpen}
        onClose={props.closeTask}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <Typography id="modal-modal-description" sx={{ mt: 2, margin: 0 }}>
              <FormattedMessage id="task_modal_user" />
              {auth.name}
            </Typography>
          </div>
          <div className="task-input__container">
            {isEditInputTitle ? (
              <EditTask
                title={props.task.title}
                type={'title'}
                closeContainer={() => setIsEditInputTitle(false)}
                editTaskHandle={props.editInput}
              />
            ) : (
              <div className="task__input">
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <FormattedMessage id="task_modal_title" />
                  {props.task.title}
                </Typography>
                <IconButton type="submit" size={'small'} onClick={() => setIsEditInputTitle(true)}>
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
          <div>
            {isEditInputDescription ? (
              <EditTask
                title={props.task.description}
                type={'description'}
                closeContainer={() => setIsEditInputDescription(false)}
                editTaskHandle={props.editInput}
              />
            ) : (
              <div className="task__input">
                <Typography id="modal-modal-description" sx={{ mt: 2, margin: 0 }}>
                  <FormattedMessage id="task_modal_description" />
                  {props.task.description}
                </Typography>
                <IconButton
                  type="submit"
                  size={'small'}
                  onClick={() => setIsEditInputDescription(true)}
                >
                  <EditIcon />
                </IconButton>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};
