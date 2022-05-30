import React, { useState } from 'react';
import './Edit.css';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { Alert, Box, CardMedia, Modal, Snackbar, Typography } from '@mui/material';
import { fetchEdit } from '../../redux/reducers/ActionCreators';
import { IEditProps } from '../../types/editPropsTypes';
import { useNavigate } from 'react-router-dom';
import Preload from '../../components/Preload';
import { FormattedMessage } from 'react-intl';
import { unwrapResult } from '@reduxjs/toolkit';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: `${theme.spacing(0)} auto`,
      [theme.breakpoints.down('sm')]: {
        width: 300,
      },
      [theme.breakpoints.up('sm')]: {
        width: 400,
      },
    },
    loginBtn: {
      marginTop: theme.spacing(2),
      flexGrow: 1,
      background: 'var(--peach)',
    },
    header: {
      textAlign: 'center',
      background: '#212121',
      color: '#fff',
    },
    card: {
      marginTop: theme.spacing(10),
      [theme.breakpoints.down('sm')]: {
        width: 300,
      },
      [theme.breakpoints.up('sm')]: {
        width: 400,
      },
    },
  })
);

const style = {
  position: 'absolute',
  top: '70%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  border: '2px solid var(--dark-blue)',
  backgroundColor: 'var(--light-blue)',
  boxShadow: 24,
  p: 4,
};

const Edit = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { auth } = useAppSelector((state) => state.authReducers);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenСonfirmation, setIsOpenСonfirmation] = useState(false);
  const [newPass, setNewPass] = useState('');
  const [newLog, setNewLog] = useState('');

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<IEditProps>({
    mode: 'all',
  });

  const handleClose = () => {
    setIsOpen(false);
    setIsOpenСonfirmation(false);
    navigate('/main');
  };

  const submit = (data: IEditProps) => {
    dispatch(
      fetchEdit({ name: data.name, login: data.login, password: data.password, id: auth.id })
    )
      .then(unwrapResult)
      .then(() => {
        setNewPass(data.password);
        setNewLog(data.login);
        !auth.error && setIsOpenСonfirmation(true);
        !!auth.error && setIsOpen(true);
      });
    reset();
  };

  return (
    <div className="edit">
      <CardMedia
        component="img"
        image="./pngegg40.png"
        style={{ width: '25%', marginLeft: 0 }}
        className="img"
        alt="green iguana"
      />
      <form onSubmit={handleSubmit(submit)} className={classes.container} autoComplete="off">
        {auth.isLoading ? (
          <Preload />
        ) : (
          <Card className={classes.card}>
            <CardHeader
              className={classes.header}
              title={<FormattedMessage id="auth_header_title" />}
            />
            <CardContent>
              <div>
                <TextField
                  fullWidth
                  id="name"
                  type="text"
                  label={<FormattedMessage id="auth_name_label" />}
                  // placeholder="Name"
                  margin="normal"
                  defaultValue={auth.name}
                  {...register('name', {
                    required: (<FormattedMessage id="auth_required_error" />) as unknown as string,
                    minLength: {
                      value: 5,
                      message: (<FormattedMessage id="auth_length_error" />) as unknown as string,
                    },
                  })}
                />
                <div style={{ color: 'red' }}>
                  {errors?.name && <p>{errors?.name?.message || 'Error!'}</p>}
                </div>

                <TextField
                  fullWidth
                  id="login"
                  type="text"
                  label={<FormattedMessage id="auth_new_login_label" />}
                  // placeholder="New Login"
                  margin="normal"
                  {...register('login', {
                    required: (<FormattedMessage id="auth_required_error" />) as unknown as string,
                    minLength: {
                      value: 5,
                      message: (<FormattedMessage id="auth_length_error" />) as unknown as string,
                    },
                  })}
                />
                <div style={{ color: 'red' }}>
                  {errors?.login && <p>{errors?.login?.message || 'Error!'}</p>}
                </div>

                <TextField
                  fullWidth
                  id="password"
                  type="password"
                  label={<FormattedMessage id="auth_new_password_label" />}
                  // placeholder="New Password"
                  margin="normal"
                  {...register('password', {
                    required: (<FormattedMessage id="auth_required_error" />) as unknown as string,
                    minLength: {
                      value: 3,
                      message: (
                        <FormattedMessage id="auth_length_password_error" />
                      ) as unknown as string,
                    },
                  })}
                />
                <div style={{ color: 'red' }}>
                  {errors?.password && <p>{errors?.password?.message || 'Error!'}</p>}
                </div>
              </div>
            </CardContent>
            <CardActions>
              <Button
                type="submit"
                disabled={!isValid}
                variant="contained"
                size="large"
                className={classes.loginBtn}
              >
                <FormattedMessage id="change_btn" />
              </Button>
            </CardActions>
            <Modal
              open={isOpenСonfirmation}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Changes applied!
                </Typography>
                <Typography component={'p'} id="modal-modal-description" sx={{ mt: 2 }}>
                  New Login - {newLog}
                </Typography>
                <Typography component={'p'} id="modal-modal-description" sx={{ mt: 2 }}>
                  New Password - {newPass}
                </Typography>
              </Box>
            </Modal>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                User was not founded!
              </Alert>
            </Snackbar>
          </Card>
        )}
      </form>
    </div>
  );
};

export default Edit;
