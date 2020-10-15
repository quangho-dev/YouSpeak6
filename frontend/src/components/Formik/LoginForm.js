import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
}));

const LoginForm = () => {
  const classes = useStyles();
  const initialValues = {
    email: '',
    password: '',
  };

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  const validationSchema = Yup.object({
    email: Yup.string().email('Email không đúng!').required('Cần điền!'),
    password: Yup.string().required('Cần điền!'),
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
