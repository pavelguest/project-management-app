import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';
import './ModalCreateItem.css';

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
}

const validationSchema = yup.object({
  name: yup
    .string()
    .required('Title is required')
    .test('only letters', 'Name should contain only letters and numbers', (value) => {
      return !/[\&!@#$%\^\*\)\(\[\]\{\}<>,/\/\+\\]/.test(value as string);
    })
    .min(3, 'Title must be 3 or more characters')
    .max(20, 'Title must be 20 or less characters'),
});
export const ModalCreateItem = ({
  type,
  create,
}: {
  type: string;
  create: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  const initialValues: IInitialValues = {
    name: '',
  };
  const formik = useFormik({
    initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      create(values.name);
      handleClose();
    },
  });

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
        {`create ${type}`}
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
              label="Enter Title"
              type="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
                {`Add ${type}`}
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
                Close
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};
