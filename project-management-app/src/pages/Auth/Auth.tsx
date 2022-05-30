import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchLogin, fetchRegistr } from '../../redux/reducers/ActionCreators';
import { Alert, CardMedia, Snackbar } from '@mui/material';
import { FormInputsTypes } from '../../types/formInputsTypes';
import { unwrapResult } from '@reduxjs/toolkit';
import Preload from '../../components/Preload';
import { FormattedMessage } from 'react-intl';
import './Auth.css';
// import { useCookies } from 'react-cookie';

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

const Auth = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const registrationMatches = matchPath({ path: '/registration', end: true }, location.pathname);
  const { auth } = useAppSelector((state) => state.authReducers);
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  // const [cookies, setCookie] = useCookies(['name', 'login', 'password', 'token']);
  // const [cookies, removeCookie] = useCookies(['name', 'login', 'password', 'token']);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormInputsTypes>({
    mode: 'all',
  });

  const handleClose = () => {
    setIsOpen(false);
  };

  const submit = (data: FormInputsTypes) => {
    if (registrationMatches) {
      dispatch(fetchRegistr({ name: data.name, login: data.login, password: data.password }))
        .then(unwrapResult)
        .then(() => dispatch(fetchLogin({ login: data.login, password: data.password, name: '' })))
        .catch(() => setIsOpen(true));
      // setCookie('login', auth.login, { path: '/', maxAge: 5000 });
      // setCookie('password', auth.password, { path: '/', maxAge: 5000 });
      // setCookie('token', auth.token, { path: '/', maxAge: 5000 });
      {
        auth.isAuth && navigate('/main');
      }
    }
    if (!registrationMatches) {
      dispatch(fetchLogin({ login: data.login, password: data.password, name: '' }))
        .then(unwrapResult)
        .then(() => {})
        .catch(() => setIsOpen(true));
      {
        auth.isAuth && navigate('/main');
      }
    }
    reset();
  };

  return (
    <div className="wrap">
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
                {registrationMatches && (
                  <>
                    <TextField
                      fullWidth
                      id="name"
                      type="text"
                      label={<FormattedMessage id="auth_name_label" />}
                      // placeholder="Name"
                      margin="normal"
                      {...register('name', {
                        required: (
                          <FormattedMessage id="auth_required_error" />
                        ) as unknown as string,
                        minLength: {
                          value: 5,
                          message: (
                            <FormattedMessage id="auth_length_error" />
                          ) as unknown as string,
                        },
                      })}
                    />
                    <div style={{ color: 'red' }}>
                      {errors?.name && <p>{errors?.name?.message || 'Error!'}</p>}
                    </div>
                  </>
                )}

                <TextField
                  fullWidth
                  id="login"
                  type="text"
                  label={<FormattedMessage id="auth_login_label" />}
                  // placeholder="Login"
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
                  label={<FormattedMessage id="auth_password_label" />}
                  // placeholder="Password"
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
                <FormattedMessage id="auth_btn" />
              </Button>
            </CardActions>
            <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              open={isOpen}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                style={{ backgroundColor: 'var(--peach)' }}
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
              >
                User was not founded!
              </Alert>
            </Snackbar>
          </Card>
        )}
      </form>
    </div>
  );
};

export default Auth;
