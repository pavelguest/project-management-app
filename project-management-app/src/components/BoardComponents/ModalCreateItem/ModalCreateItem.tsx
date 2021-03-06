import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import './ModalCreateItem.css';
import { FormattedMessage } from 'react-intl';
import { useAppSelector } from '../../../hooks/redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IInitialValues {
  name: string;
  description: string;
}

export const validationSchemaForColumn = yup.object({
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
    .max(12, (<FormattedMessage id="board_elem_validate_text_max" />) as unknown as string),
});
export const validationSchemaForTask = yup.object({
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
    .max(12, (<FormattedMessage id="board_elem_validate_text_max" />) as unknown as string),
  description: yup
    .string()
    .trim()
    .required((<FormattedMessage id="board_elem_validate_description" />) as unknown as string)
    .min(3, (<FormattedMessage id="board_elem_validate_description_min" />) as unknown as string)
    .max(20, (<FormattedMessage id="board_elem_validate_description_max" />) as unknown as string),
});

interface IModalCreateItem {
  type: string;
  create: ((value: string) => void) | ((value: string, description?: string) => void);
}

export const ModalCreateItem = ({ type, create }: IModalCreateItem) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: IInitialValues = {
    name: '',
    description: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: type === 'task' ? validationSchemaForTask : validationSchemaForColumn,
    onSubmit: (values) => {
      if (type === 'task') {
        create(values.name, values.description);
      } else {
        create(values.name);
      }
      handleClose();
    },
  });
  const { locale } = useAppSelector((state) => state.localizationReducers);

  return (
    <div>
      <Button
        variant="contained"
        style={{
          whiteSpace: 'nowrap',
          boxShadow: '1px 1px 10px 1px #000a',
          backgroundColor: 'var(--light-blue)',
        }}
        fullWidth
        onClick={handleOpen}
      >
        <FormattedMessage
          id="create_board_elem_btn"
          values={
            locale === 'en'
              ? { type: type }
              : type === 'task'
              ? { type: '????????????' }
              : { type: '??????????????' }
          }
        />
        <AddIcon sx={{ color: 'var(--peach)', fontSize: 'medium' }} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={formik.handleSubmit} className={'modal-form'}>
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
            />
            {type === 'task' ? (
              <>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label={<FormattedMessage id="create_modal_description" />}
                  type="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </>
            ) : (
              ''
            )}
            <div className="modal-form__buttons">
              <Button
                variant="contained"
                style={{
                  whiteSpace: 'nowrap',
                  boxShadow: '1px 1px 10px 1px #000a',
                  backgroundColor: 'var(--blue)',
                }}
                type="submit"
              >
                <FormattedMessage
                  id="add_board_elem_btn"
                  values={
                    locale === 'en'
                      ? { type: type }
                      : type === 'task'
                      ? { type: '????????????' }
                      : { type: '??????????????' }
                  }
                />
              </Button>
              <Button
                variant="contained"
                style={{
                  whiteSpace: 'nowrap',
                  boxShadow: '1px 1px 10px 1px #000a',
                  backgroundColor: 'var(--blue)',
                }}
                onClick={handleClose}
              >
                <FormattedMessage id="cancel_btn" />
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
