import React, { useState, useEffect } from 'react'
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
import { Formik, Form, Field, ErrorMessage } from 'formik'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import {
  getCurrentProfileTeacher,
  createOrUpdateProfileTeacher,
} from '../../../actions/profileTeacher'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProfileTeacherPage1 from './ProfileTeacherPage1'
import ProfileTeacherPage2 from './ProfileTeacherPage2'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { format } from 'date-fns'

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

const ProfileTeacher = ({ history }) => {
  const [teacherAvatarState, setTeacherAvatarState] = useState(null)
  const [typeOfTeacherState, setTypeOfTeacherState] = useState('')
  const [dateOfBirthState, setDateOfBirthState] = useState(null)
  const [hometownState, setHometownState] = useState('VN')
  const [communicationToolState, setCommunicationToolState] = useState([])
  const [introductionState, setIntroductionState] = useState('')
  const [videoState, setVideoState] = useState('')
  const [thumbnailState, setThumbnailState] = useState('')
  const [degreeImagesState, setDegreeImagesState] = useState([])
  const [expImagesState, setExpImagesState] = useState([])

  const [page, setPage] = useState(0)
  const [activeStep, setActiveStep] = useState(0)

  // cac step trong stepper
  const getSteps = () => {
    return ['Chọn kiểu giáo viên', 'Điền thông tin giáo viên']
  }

  const steps = getSteps()

  const classes = useStyles()

  const dispatch = useDispatch()

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

  const pages = [
    <ProfileTeacherPage1 nextPage={nextPage} />,
    <ProfileTeacherPage2 nextPage={nextPage} prevPage={prevPage} />,
  ]

  const [uploading, setUploading] = useState(false)

  const profileTeacher = useSelector((state) => state.profileTeacher)
  const { loading, profileTeacher: profileTeacherRedux } = profileTeacher

  const auth = useSelector((state) => state.auth)
  const { user } = auth

  const validationSchema = yup.object().shape({
    dateOfBirth: yup.date().nullable(),
  })

  useEffect(() => {
    if (!profileTeacher) {
      dispatch(getCurrentProfileTeacher())
    }
    if (!loading && profileTeacher && profileTeacherRedux) {
      setTeacherAvatarState(profileTeacherRedux.teacherAvatar)
      setTypeOfTeacherState(profileTeacherRedux.typeOfTeacher)
      setDateOfBirthState(profileTeacherRedux.dateOfBirth)
      setHometownState(profileTeacherRedux.hometown)
      setCommunicationToolState(profileTeacherRedux.communicationTool)
      setIntroductionState(profileTeacherRedux.introduction)
      setVideoState(profileTeacherRedux.video)
      setThumbnailState(profileTeacherRedux.thumbnail)
      setDegreeImagesState(profileTeacherRedux.degreeImages)
      setExpImagesState(profileTeacherRedux.expImages)
    }
  }, [profileTeacherRedux, loading, dispatch])

  // const displayedCommunicationTool = Object.keys(
  //   profileTeacherRedux.communicationTool
  // ).map((tool) => {
  //   tool, profileTeacherRedux.communicationTool[tool]
  // })

  // console.log(
  //   'day la communicationTool:',
  //   profileTeacherRedux.communicationTool
  // )

  return (
    <Formik
      enableReinitialize
      initialValues={{
        teacherAvatar: teacherAvatarState,
        dateOfBirth: dateOfBirthState,
        typeOfTeacher: typeOfTeacherState,
        hometown: hometownState,
        communicationTool: communicationToolState,
        video: videoState,
        thumbnail: thumbnailState,
        degreeImages: degreeImagesState,
        expImages: expImagesState,
        introduction: introductionState,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting }) => {
        const {
          teacherAvatar,
          dateOfBirth,
          typeOfTeacher,
          hometown,
          communicationTool,
          video,
          thumbnail,
          degreeImages,
          expImages,
          introduction,
        } = values
        setTimeout(() => {
          dispatch(
            createOrUpdateProfileTeacher(
              {
                teacherAvatar,
                dateOfBirth,
                typeOfTeacher,
                hometown,
                communicationTool,
                video,
                degreeImages,
                expImages,
                thumbnail,
                introduction,
              },
              history,
              profileTeacher ? true : false
            )
          )
          setSubmitting(false)
        }, 400)
      }}
    >
      {({
        values,
        errors,
        touched,
        handleSubmit,
        isSubmitting,
        dirty,
        setFieldValue,
        setTouched,
        isValid,
      }) => (
        <Dialog open fullWidth maxWidth="lg">
          <div className={classes.toolbarMargin} />
          <Form autoComplete="off">
            <Grid
              container
              alignItems="center"
              className={classes.paddingContainer}
              style={{ marginRight: 'auto' }}
            >
              <Grid item>
                <Link to="/teachers/dashboard">
                  <ArrowBackIcon fontSize="large" color="primary" />
                </Link>
              </Grid>
              <Grid item>
                <Typography
                  variant="body2"
                  component={Link}
                  to="/teachers/dashboard"
                  variant="text"
                  style={{
                    fontWeight: '600',
                    marginLeft: '0.5em',
                    textDecoration: 'none',
                  }}
                  className={classes.linkText}
                >
                  Trở về Dashboard
                </Typography>
              </Grid>
            </Grid>

            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {pages[page]}
            <DialogActions>
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
                      style={{ color: 'white' }}
                    >
                      Trở về
                    </Button>
                  </Grid>
                )}
                {page === pages.length - 1 ? (
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disableRipple
                      disabled={!isValid || isSubmitting}
                      style={{ color: 'white' }}
                    >
                      Gửi đăng ký
                    </Button>
                  </Grid>
                ) : page !== 0 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      nextPage()
                    }}
                    disableRipple
                    style={{ color: 'white' }}
                  >
                    Trang kế tiếp
                  </Button>
                ) : null}
              </Grid>
            </DialogActions>
            <div>
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </div>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default ProfileTeacher
