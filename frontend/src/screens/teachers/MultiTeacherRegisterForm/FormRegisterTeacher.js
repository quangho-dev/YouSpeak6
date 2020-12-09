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
} from '@material-ui/core'
import {
  Field,
  Form,
  Formik,
  FormikConfig,
  FormikValues,
  ErrorMessage,
} from 'formik'
import { CheckboxWithLabel, TextField } from 'formik-material-ui'
import React, { useState } from 'react'
import { mixed, number, object, string } from 'yup'
import FormikStep from './FormikStep'
import FormikStepper from './FormikStepper'
import * as Yup from 'yup'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
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
}))

const FormRegisterTeacher = () => {
  const [isPro, setIsPro] = useState(false)
  const [isCommutor, setIsCommutor] = useState(false)
  const [step, setStep] = useState(0)

  const classes = useStyles()

  const handleSelectProType = () => {
    setIsPro(true)
    setIsCommutor(false)
    setStep((s) => s + 1)
    console.log('isPro', isPro)
  }

  const handleSelectCommutorType = () => {
    setIsCommutor(true)
    setIsPro(false)
    setStep((s) => s + 1)
    console.log('isCommutor', isCommutor)
  }
  return (
    <div style={{ backgroundColor: '#888', minHeight: '100vh ' }}>
      <div className={classes.toolbarMargin}></div>
      <Card>
        <CardContent>
          <FormikStepper
            initialValues={{
              name: '',
              email: '',
              password: '',
              confirmPassword: '',
              degreeImages: [],
              expImages: [],
            }}
            onSubmit={async (values) => {
              console.log('values', { isPro, isCommutor, ...values })
            }}
            isPro={isPro}
            step={step}
            setStep={setStep}
          >
            <FormikStep
              label="Đăng ký tài khoản"
              validationSchema={object({
                name: string().required('Bạn cần điền tên hiển thị'),
                email: string()
                  .email('Định dạng của email không đúng')
                  .required('Bạn cần điền email'),
                password: string()
                  .min(6, 'Mật khẩu phải chứa ít nhất 6 ký tự')
                  .required('Bạn cần điền mật khẩu'),
                confirmPassword: string()
                  .oneOf(
                    [Yup.ref('password'), null],
                    'Mật khẩu chưa trùng khớp'
                  )
                  .required('Bạn cần điền xác nhận mật khẩu'),
              })}
            >
              <Grid
                item
                container
                alignItems="center"
                className={classes.paddingContainer}
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
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="name"
                  component={TextField}
                  label="Tên hiển thị"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="email"
                  component={TextField}
                  label="Email"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="password"
                  type="password"
                  component={TextField}
                  label="Mật khẩu"
                />
              </Box>
              <Box paddingBottom={2}>
                <Field
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  component={TextField}
                  label="Xác nhận mật khẩu"
                />
              </Box>
            </FormikStep>
            <FormikStep
              label="Chọn kiểu giáo viên"
              step={step}
              setStep={setStep}
            >
              <div style={{ textAlign: 'center' }}>
                <Typography
                  gutterBottom
                  style={{ textTransform: 'uppercase', fontWeight: '600' }}
                  variant="h4"
                  component="h2"
                >
                  Chọn kiểu giáo viên
                </Typography>
              </div>
              <Grid container justify="center" spacing={3} alignItems="stretch">
                <Grid
                  item
                  component={Card}
                  xs
                  style={{ backgroundColor: '#e5e5e5' }}
                  className={classes.card}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      component="h2"
                      style={{
                        textTransform: 'uppercase',
                        textAlign: 'center',
                      }}
                    >
                      Giáo viên chuyên nghiệp
                    </Typography>
                    <h4>* Quyền lợi:</h4>
                    <ul>
                      <li>
                        Được hiển thị là kiểu giáo viên chuyên nghiệp, tăng mức
                        độ uy tín.
                      </li>
                      <li>Tự định giá bài học của bạn.</li>
                    </ul>
                    <h4>* Yêu cầu:</h4>
                    <ul>
                      <li>
                        Cung cấp hình ảnh của các văn bằng về dạy tiếng Anh
                      </li>
                      <li>Video giới thiệu dài từ 1 - 3 phút</li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disableRipple
                      style={{ color: 'white' }}
                      onClick={handleSelectProType}
                    >
                      Chọn
                    </Button>
                    {/* <Box gutterBottom style={{ margin: 'auto' }}>
                      <Field
                        color="primary"
                        component={CheckboxWithLabel}
                        type="checkbox"
                        name="isProfessional"
                        Label={{
                          label: 'Chọn giáo kiểu giáo viên chuyên nghiệp',
                          labelPlacement:  'start',
                        }}
                      />
                    </Box> */}
                  </CardActions>
                </Grid>
                <Grid
                  item
                  component={Card}
                  xs
                  style={{ backgroundColor: '#e5e5e5' }}
                  className={classes.card}
                >
                  <CardContent>
                    <div style={{ textAlign: 'center' }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        style={{ textTransform: 'uppercase' }}
                      >
                        Giáo viên cộng đồng
                      </Typography>
                    </div>
                    <h4>* Quyền lợi:</h4>
                    <ul>
                      <li>Tự định giá bài học của bạn.</li>
                    </ul>
                    <h4>* Yêu cầu:</h4>
                    <ul>
                      <li>Video giới thiệu dài từ 1 - 3 phút</li>
                    </ul>
                  </CardContent>
                  <CardActions>
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disableRipple
                      style={{ color: 'white' }}
                      onClick={handleSelectCommutorType}
                    >
                      Chọn
                    </Button>
                  </CardActions>
                </Grid>
              </Grid>
            </FormikStep>
            <FormikStep label="this is next step">
              <p>this is next step</p>
              {isPro && <p>I am a professional teacher!</p>}
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  )
}

export default FormRegisterTeacher
