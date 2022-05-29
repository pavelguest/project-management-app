import {
  Box,
  Button,
  // FormControl,
  // InputLabel,
  // MenuItem,
  Modal,
  // Select,
  TextField,
} from '@mui/material';
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
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface IInitialValues {
  name: string;
  description: string;
  // select: string;
}

export const validationSchemaForColumn = yup.object({
  name: yup
    .string()
    .required((<FormattedMessage id="board_elem_validate_text" />) as unknown as string)
    .test('only letters', 'Name should contain only letters and numbers', (value) => {
      return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
    })
    .min(3, 'Title must be 3 or more characters')
    .max(20, 'Title must be 20 or less characters'),
});
export const validationSchemaForTask = yup.object({
  name: yup
    .string()
    .required('Title is required')
    .test('only letters', 'Name should contain only letters and numbers', (value) => {
      return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
    })
    .min(3, 'Title must be 3 or more characters')
    .max(20, 'Title must be 20 or less characters'),
  description: yup
    .string()
    .required('Description is required')
    .test('only letters', 'Name should contain only letters and numbers', (value) => {
      return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
    })
    .min(3, 'Description must be 3 or more characters')
    .max(20, 'Description must be 20 or less characters'),
  // select: yup.string().required('This field is required'),
});

interface IModalCreateItem {
  type: string;
  create: ((value: string) => void) | ((value: string, description?: string) => void);
}

export const ModalCreateItem = ({ type, create }: IModalCreateItem) => {
  // const { auth } = useAppSelector((state) => state.authReducers);
  // const users = auth.allUsers;
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: IInitialValues = {
    name: '',
    description: '',
    // select: '',
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
        {/* {`create ${type}`} */}
        <FormattedMessage
          id="create_board_elem_btn"
          values={
            locale === 'en'
              ? { type: type }
              : type === 'task'
              ? { type: 'задачу' }
              : { type: 'колонку' }
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
                  label="Enter Description"
                  type="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
                {/* <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select User</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="select"
                    name="select"
                    label="Select User"
                    value={formik.values.select}
                    onChange={formik.handleChange}
                    error={formik.touched.select && Boolean(formik.errors.select)}
                  >
                    {users.map((elem, index) => {
                      console.log(elem);
                      console.log(elem.name);
                      return <MenuItem key={index}>{elem.name}</MenuItem>;
                    })}
                  </Select>
                </FormControl> */}
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
                {/* {`Add ${type}`} */}
                <FormattedMessage
                  id="add_board_elem_btn"
                  values={
                    locale === 'en'
                      ? { type: type }
                      : type === 'task'
                      ? { type: 'задачу' }
                      : { type: 'колонку' }
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
