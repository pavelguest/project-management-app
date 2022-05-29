import { useFormik } from 'formik';
import React from 'react';
import { validationSchemaForColumn } from '../BoardComponents/ModalCreateItem/ModalCreateItem';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
import './ChangeTitleColumn.css';
import { FormattedMessage } from 'react-intl';

interface IInitialValues {
  name: string;
}
interface IPropsChangeTitle {
  title: string;
  closeContainer: () => void;
  changeTitleColumn: (value: string) => void;
}

export const ChangeTitleColumn = (props: IPropsChangeTitle) => {
  const initialValues: IInitialValues = {
    name: props.title,
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchemaForColumn,
    onSubmit: (values) => {
      props.changeTitleColumn(values.name);
      props.closeContainer();
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={'title__form-container'}>
      <IconButton type="submit" size={'small'}>
        <CheckIcon />
      </IconButton>
      <IconButton size={'small'} onClick={props.closeContainer}>
        <CloseIcon />
      </IconButton>
      <TextField
        fullWidth
        id="name"
        name="name"
        label={<FormattedMessage id="create_modal_title" />}
        type="name"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        variant="standard"
        size="small"
        inputProps={{ style: { fontSize: 15, height: 10 } }}
        InputLabelProps={{ style: { fontSize: 13 } }}
        sx={{ height: '20px' }}
      />
    </form>
  );
};
