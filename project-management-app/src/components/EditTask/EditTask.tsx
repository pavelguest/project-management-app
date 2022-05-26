import { useFormik } from 'formik';
import React from 'react';
import { validationSchemaForColumn } from '../BoardComponents/ModalCreateItem/ModalCreateItem';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextareaAutosize, TextField } from '@mui/material';
import './EditTask.css';

interface IInitialValues {
  name: string;
}
interface IPropsChangeTitle {
  title: string;
  type: string;
  closeContainer: () => void;
  editTaskHandle: (title: string, type: string) => void;
}

export const EditTask = (props: IPropsChangeTitle) => {
  const initialValues: IInitialValues = {
    name: props.title,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaForColumn,
    onSubmit: (values) => {
      props.editTaskHandle(values.name, props.type);
      props.closeContainer();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={'task__form-container'}>
      <IconButton type="submit" size={'small'}>
        <CheckIcon />
      </IconButton>
      <IconButton size={'small'} onClick={props.closeContainer}>
        <CloseIcon />
      </IconButton>
      {props.type === 'title' ? (
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Enter Title"
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
          size="small"
        />
      ) : (
        <TextareaAutosize
          id="name"
          name="name"
          aria-label="minimum height"
          minRows={3}
          placeholder="Minimum 3 rows"
          value={formik.values.name}
          onChange={formik.handleChange}
          style={{ width: 200 }}
        />
      )}
    </form>
  );
};
