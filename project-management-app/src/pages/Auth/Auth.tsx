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
import { Alert, Snackbar } from '@mui/material';
import { FormInputsTypes } from '../../types/formInputsTypes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      margin: `${theme.spacing(0)} auto`,
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
      width: 400,
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
      dispatch(fetchRegistr({ name: data.name, login: data.login, password: data.password }));
      {
        auth.isAuth && navigate('/main');
      }
    }
    if (!registrationMatches) {
      dispatch(fetchLogin({ login: data.login, password: data.password, name: '' }));
      {
        auth.isAuth && navigate('/main');
        !!auth.error && setIsOpen(true);
      }
    }

    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={classes.container} autoComplete="off">
      <Card className={classes.card}>
        <CardHeader className={classes.header} title="Login App" />
        <CardContent>
          <div>
            {registrationMatches && (
              <>
                <TextField
                  fullWidth
                  id="name"
                  type="text"
                  label="Name"
                  placeholder="Name"
                  margin="normal"
                  {...register('name', {
                    required: 'Поле обязательно к заполнению',
                    minLength: {
                      value: 5,
                      message: 'Длинна не менее 5 символов',
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
              label="Login"
              placeholder="Login"
              margin="normal"
              {...register('login', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 5,
                  message: 'Длинна не менее 5 символов',
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
              label="Password"
              placeholder="Password"
              margin="normal"
              {...register('password', {
                required: 'Поле обязательно к заполнению',
                minLength: {
                  value: 3,
                  message: 'Длинна не менее 3 символов',
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
            Login
          </Button>
        </CardActions>
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {auth.errorLogin}
          </Alert>
        </Snackbar>
      </Card>
    </form>
  );
};

export default Auth;
