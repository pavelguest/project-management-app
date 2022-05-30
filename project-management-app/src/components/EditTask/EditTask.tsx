import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';
// import { validationSchemaForColumn } from '../BoardComponents/ModalCreateItem/ModalCreateItem';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
import './EditTask.css';
import { FormattedMessage } from 'react-intl';

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
    validationSchema: yup.object({
      name: yup
        .string()
        .trim()
        .required((<FormattedMessage id="board_elem_validate_text" />) as unknown as string)
        .test(
          'only letters',
          (<FormattedMessage id="board_elem_validate_text_test" />) as unknown as string,
          (value) => {
            return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
          }
        )
        .min(3, (<FormattedMessage id="board_elem_validate_text_min" />) as unknown as string)
        .max(
          props.type === 'title' ? 12 : 20,
          (props.type === 'title' ? (
            <FormattedMessage id="board_elem_validate_text_max" />
          ) : (
            <FormattedMessage id="board_elem_validate_description_max" />
          )) as unknown as string
        ),
    }),
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
          label={<FormattedMessage id="create_modal_title" />}
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
          size="small"
        />
      ) : (
        <TextField
          fullWidth
          id="name"
          name="name"
          label={<FormattedMessage id="create_modal_description" />}
          type="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          variant="standard"
          size="small"
        />
      )}
    </form>
  );
};
