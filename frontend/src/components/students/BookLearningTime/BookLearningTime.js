import React, { useState, useEffect } from 'react'
import { Grid, Stepper, Step, StepLabel, Dialog } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getAvailableTimeOfATeacher } from '../../../actions/bookingCalendar'
import { getLessonsOfTeacherById } from '../../../actions/lessons'
import { Link } from 'react-router-dom'
import MyButton from '../../ui/MyButton'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Formik, Form } from 'formik'
import ChooseLesson from './ChooseLesson'
import ChooseDuration from './ChooseDuration'
import ChooseTime from './ChooseTime'
import { makeStyles } from '@material-ui/styles'
import { bookTime } from '../../../actions/bookingCalendarStudent'

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
}))

const BookLearningTime = (props) => {
  const [page, setPage] = useState(0)
  const [calendarEvents, setCalendarEvents] = useState([])
  const [lessonListState, setLessonListState] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  const classes = useStyles()

  const teacherCalendarId = props.match.params.teacherCalendarId

  const dispatch = useDispatch()

  const bookingCalendar = useSelector((state) => state.bookingCalendar)
  const { availableTime, loading, currentTeacher } = bookingCalendar

  const lesson = useSelector((state) => state.lesson)
  const { lessons, loading: loadingLessons } = lesson

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
    handleNext()
  }

  const prevPage = () => {
    setPage(page - 1)
    handleBack()
  }

  const initialValues = {
    lesson: '6034ad53e2a3912a68b1d2c0',
    teacher: teacherCalendarId,
    duration: 0,
    bookedTime: [{ start: null, end: null, title: 'Booked time' }],
    price: 0,
    id1: '',
    id2: '',
  }

  const pages = [
    <ChooseLesson
      nextPage={nextPage}
      currentTeacher={currentTeacher}
      lessonListState={lessonListState}
      calendarEvents={calendarEvents}
      loading={loading}
      loadingLessons={loadingLessons}
    />,
    <ChooseDuration
      nextPage={nextPage}
      prevPage={prevPage}
      lessonListState={lessonListState}
    />,
    <ChooseTime prevPage={prevPage} calendarEvents={calendarEvents} />,
  ]

  useEffect(() => {
    if (
      !availableTime[0] ||
      currentTeacher._id !== teacherCalendarId ||
      !lessons[0]
    ) {
      dispatch(getAvailableTimeOfATeacher(teacherCalendarId))
      dispatch(getLessonsOfTeacherById(teacherCalendarId))
    } else {
      setCalendarEvents(availableTime)
      setLessonListState(lessons)
    }
  }, [dispatch, availableTime, teacherCalendarId, currentTeacher, lessons])

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        dispatch(bookTime(values))
        // props.history.push('/teachers/english')
      }}
    >
      {({ isValid, isSubmitting, values, errors }) => (
        <Dialog open fullWidth maxWidth="lg">
          <div className={classes.toolbarMargin} />
          <Form autoComplete="off">
            <Grid
              container
              direction="column"
              alignItems="center"
              style={{ padding: '2em 3em', backgroundColor: '#F0F2F5' }}
              spacing={1}
            >
              <Grid item style={{ alignSelf: 'flex-start' }}>
                {page === 0 ? (
                  <MyButton component={Link} to="/teachers/english">
                    <ArrowBackIcon />
                    &nbsp;Trở về danh sách giáo viên
                  </MyButton>
                ) : (
                  <MyButton onClick={() => prevPage()}>
                    <ArrowBackIcon />
                    &nbsp;Trở về bước trước
                  </MyButton>
                )}
              </Grid>

              <Grid item style={{ width: '100%' }}>
                <Stepper
                  activeStep={activeStep}
                  style={{ backgroundColor: '#F0F2F5' }}
                >
                  <Step>
                    <StepLabel>Chọn bài học</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Chọn thời lượng của bài học</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Đặt lịch</StepLabel>
                  </Step>
                </Stepper>
              </Grid>

              {pages[page]}

              <Grid item>
                <pre>{JSON.stringify(values, null, 2)}</pre>
              </Grid>
            </Grid>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default BookLearningTime
