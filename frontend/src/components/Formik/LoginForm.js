import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'
import Message from '../ui/Message'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
}));

const LoginForm = ({location, history}) => {
  const classes = useStyles();
  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const validationSchema = Yup.object({
    email: Yup.string().email('Email không đúng').required('Không được để trống'),
    password: Yup.string().required('Không được để trống'),
  });

  const onSubmit = async (values) => {
    console.log('Form data', values);
    const { email, password } = values;
    dispatch(login(email, password))
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form style={{ maxWidth: '25em' }}>
            {error && <Message severity='error'>{error}</Message>}
            {loading && <CircularProgress style={{margin: 'auto'}} />}
            <FormikControl
              control="input"
              type="email"
              label="Email"
              name="email"
              className={classes.formControl}
            />
            <FormikControl
              control="input"
              type="password"
              label="Password"
              name="password"
              className={classes.formControl}
            />
            <Button
              fullWidth
              color="primary"
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
              style={{ color: 'white' }}
            >
              Đăng nhập
            </Button>
            <Grid
                container
                alignItems="center"
                justify="center"
                style={{ margin: '0.7em 0' }}
              >
                <Grid item>
                  <Typography variant="body1">
                    Bạn chưa có tài khoản?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    variant="text"
                    style={{
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: '600',
                    }}
                    disableRipple
                  >
                    Đăng ký
                  </Button>
                </Grid>
              </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
