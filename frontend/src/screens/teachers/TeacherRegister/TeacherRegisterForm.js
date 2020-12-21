import React, { useState } from 'react'
import { Formik, Form } from 'formik'
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
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Page1 from './ui/Page1'
import Page2 from './ui/Page2'
import Page3 from './ui/Page3'
import { mixed, number, object, string } from 'yup'
import * as Yup from 'yup'

// cac step trong stepper
const getSteps = () => {
  return [
    'Đăng ký tài khoản giáo viên',
    'Chọn kiểu giáo viên',
    'Điền thông tin giáo viên',
  ]
}

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
  const [page, setPage] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  const steps = getSteps()
  const classes = useStyles()

  const isLastPage = () => page === pages.length - 1

  // buoc ke tiep cua stepper
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  // tro ve cua stepper
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  // Proceed to next page
  const nextPage = () => {
    setPage(page + 1)
    handleNext()
  }

  // Go back to prev page
  const prevPage = () => {
    setPage(page - 1)
    handleBack()
  }

  const submit = async (values, helpers) => {
    if (isLastPage()) {
      // await submit(values, helpers)
    } else {
      setPage(page + 1)
      // helpers.setTouched({})
    }
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
    typeOfTeacher: string().required('Bạn phải chọn kiểu giáo viên'),
  })

  const pages = [
    <Page1 label="Đăng ký tài khoản" />,
    <Page2
      nextPage={nextPage}
      prevPage={prevPage}
      label="Chọn kiểu giáo viên"
    />,
    <Page3 label="Điền thông tin của giáo viên" />,
  ]

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        typeOfTeacher: '',
        teacherAvatar: null,
        dateOfBirth: '',
        hometown: 'VN',
        communicationTool: {
          skype: false,
          googleHangouts: false,
          viper: false,
          facetime: false,
        },
        introduction: '',
        video: '',
        thumbnail: '',
        duration: 0,
        degreeImages: [],
        expImages: [],
      }}
      validationSchema={validation}
      onSubmit={submit}
    >
      {({
        values,
        errors,
        handleSubmit,
        isSubmitting,
        dirty,
        setFieldValue,
      }) => (
        <Form autoComplete="off">
          <Dialog open fullWidth maxWidth="lg">
            <div className={classes.toolbarMargin} />
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {pages[page]}
            <Grid
              container
              justify="center"
              alignItems="center"
              spacing={3}
              style={{ marginTop: '1em' }}
            >
              {page !== 0 && (
                <Grid item>
                  <Button
                    onClick={() => prevPage()}
                    color="primary"
                    variant="contained"
                    disableRipple
                  >
                    Trở về
                  </Button>
                </Grid>
              )}
              {page === pages.length - 1 ? (
                <Grid item>
                  <Button
                    htmlType="submit"
                    variant="contained"
                    color="primary"
                    disableRipple
                  >
                    Gửi đăng ký
                  </Button>
                </Grid>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => nextPage()}
                  disableRipple
                >
                  Trang kế tiếp
                </Button>
              )}
            </Grid>
            <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div>
          </Dialog>
        </Form>
      )}
    </Formik>
  )
}

export default TeacherRegisterForm
