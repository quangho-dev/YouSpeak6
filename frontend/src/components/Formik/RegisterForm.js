import React, { Fragment } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { register } from '../../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginBottom: '1em',
  },
}));

const RegistrationForm = () => {
  const classes = useStyles();

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Không được để trống.'),
    email: Yup.string()
      .email('Email không đúng.')
      .required('Không được để trống.'),
    password: Yup.string().required('Không được để trống.'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), ''], 'Mật khẩu không trùng khớp.')
      .required('Không được để trống.'),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { name, email, password } = values;
    dispatch(register(name, email, password))
    resetForm({ name: '', email: '', password: '' });
  };

  return (
 <Fragment>
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
                type="text"
                label="Tên tài khoản"
                name="name"
                className={classes.formControl}
              />
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
                label="Mật khẩu"
                name="password"
                className={classes.formControl}
              />
              <FormikControl
                control="input"
                type="password"
                label="Xác nhận mật khẩu"
                name="confirmPassword"
                className={classes.formControl}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={!formik.isValid}
                style={{ color: 'white' }}
              >
                {loading ? (
                  <CircularProgress color="secondary" />
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default RegistrationForm
