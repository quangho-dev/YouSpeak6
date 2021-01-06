import React from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
  CardActions,
  LinearProgress,
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  CardMedia,
  Dialog,
  IconButton,
  DialogActions,
} from '@material-ui/core'
import {
  Field,
  Formik,
  FormikConfig,
  FormikValues,
  ErrorMessage,
  Form,
} from 'formik'
import { CheckboxWithLabel, TextField, Select } from 'formik-material-ui'
import { mixed, number, object, string } from 'yup'
import * as Yup from 'yup'
import { registerTeacher } from '../../../actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { makeStyles } from '@material-ui/styles'
import { Link, Redirect } from 'react-router-dom'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2.25em',
    },
  },
  card: {
    // Provide some spacing between cards
    margin: 16,

    // Use flex layout with column direction for components in the card
    // (CardContent and CardActions)
    display: 'flex',
    flexDirection: 'column',

    // Justify the content so that CardContent will always be at the top of the card,
    // and CardActions will be at the bottom
    justifyContent: 'space-between',
  },
  paddingContainer: {
    padding: '0 4em',
  },
  linkText: {
    textTransform: 'uppercase',
    '&:hover, &:visited, &:active': {
      textTransform: 'uppercase',
      color: 'inherit',
    },
  },
  formControl: {
    marginBottom: '1em',
  },
  rowContainer: {
    padding: '0 4em',
  },
  degreeImageCard: {
    maxWidth: 300,
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  expImageCard: {
    maxWidth: 300,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const TeacherRegisterForm = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, loading } = auth

  if (isAuthenticated) {
    return <Redirect to="/teachers/dashboard" />
  }

  const validation = object({
    name: string().required('Bạn cần điền tên hiển thị'),
    email: string()
      .email('Định dạng của email không đúng')
      .required('Bạn cần điền email'),
    password: string()
      .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
      .required('Bạn cần điền mật khẩu'),
    confirmPassword: string()
      .oneOf([Yup.ref('password'), null], 'Mật khẩu chưa trùng khớp')
      .required('Bạn cần điền xác nhận mật khẩu'),
  })

  const onSubmitHandler = async (values, { setSubmitting, resetForm }) => {
    dispatch(registerTeacher(values))
    resetForm({ name: '', email: '', password: '', confirmPassword: '' })
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={validation}
      onSubmit={onSubmitHandler}
    >
      {({ values, errors, isSubmitting, isValid }) => (
        <Form>
          <div className={classes.toolbarMargin} />
          <Grid
            container
            alignItems="center"
            className={classes.paddingContainer}
            style={{ marginRight: 'auto' }}
          >
            <Grid item>
              <Link to="/for-teacher">
                <ArrowBackIcon fontSize="large" color="primary" />
              </Link>
            </Grid>
            <Grid item>
              <Typography
                variant="body2"
                component={Link}
                to="/for-teacher"
                variant="text"
                style={{
                  fontWeight: '600',
                  marginLeft: '0.5em',
                  textDecoration: 'none',
                }}
                className={classes.linkText}
              >
                Trở về
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.paddingContainer}
            style={{ width: '70%', margin: 'auto' }}
          >
            <Grid item>
              <Typography variant="h4" style={{ textTransform: 'uppercase' }}>
                Đăng ký tài khoản giáo viên
              </Typography>
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                fullWidth
                name="name"
                component={TextField}
                label="Tên hiển thị"
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                fullWidth
                name="email"
                component={TextField}
                label="Email"
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                name="password"
                component={TextField}
                label="Mật khẩu"
                fullWidth
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Field
                fullWidth
                name="confirmPassword"
                component={TextField}
                label="Xác nhận mật khẩu"
              />
            </Grid>
            <Grid
              item
              className={classes.formControl}
              style={{ width: '100%' }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{ color: 'white' }}
                fullWidth
                disabled={!isValid || isSubmitting}
              >
                {loading ? <CircularProgress color="secondary" /> : 'Đăng ký'}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            justify="center"
            style={{ margin: '0.7em 0' }}
          >
            <Grid item>
              <Typography variant="body1">Bạn đã có tài khoản?</Typography>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/login"
                variant="text"
                style={{
                  fontSize: '1rem',
                  textTransform: 'none',
                  fontWeight: '600',
                }}
                disableRipple
              >
                Đăng nhập
              </Button>
            </Grid>
          </Grid>
          <div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
          </div>
        </Form>
      )}
    </Formik>
  )
}
export default TeacherRegisterForm
