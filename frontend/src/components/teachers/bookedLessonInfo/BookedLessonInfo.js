import React, { useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import Spinner from '../../ui/Spinner'
import {
  getBookedLessonById,
  cancelBookedLesson,
} from '../../../actions/bookingCalendarStudent'
import { confirmBookedLesson } from '../../../actions/bookingCalendar'
import { connect } from 'react-redux'
import moment from 'moment'
import CancelIcon from '@material-ui/icons/Cancel'
import { useConfirm } from 'material-ui-confirm'

const BookedLessonInfo = ({
  getBookedLessonById,
  confirmBookedLesson,
  cancelBookedLesson,
  match,
  bookingCalendarStudent: { loading, bookedLesson },
  history,
}) => {
  const confirm = useConfirm()

  const handleCancelLesson = (bookedLessonId) => {
    confirm({
      description: 'Press ok to cancel the order',
      title: 'Are you sure?',
    })
      .then(() => {
        cancelBookedLesson(bookedLessonId)
        history.push('/teachers/booked-lessons-manager')
      })
      .catch(() => {})
  }

  useEffect(() => {
    getBookedLessonById(match.params.bookedLessonId)
  }, [match.params.bookedLessonId, getBookedLessonById])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className="container"
    >
      <Grid item>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
        >
          Order details
        </Typography>
      </Grid>

      <Grid item style={{ marginTop: '1.5em' }}>
        <Card style={{ padding: '1em' }}>
          <CardContent>
            {loading ||
            !bookedLesson ||
            !bookedLesson.bookedLesson ||
            !bookedLesson.profileStudent ? (
              <Spinner />
            ) : (
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Student's name: </strong>
                    {bookedLesson &&
                      bookedLesson.bookedLesson &&
                      bookedLesson.bookedLesson.user &&
                      bookedLesson.bookedLesson.user.name}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Type of lesson: </strong>
                    {bookedLesson &&
                      bookedLesson.bookedLesson &&
                      bookedLesson.bookedLesson.lesson &&
                      bookedLesson.bookedLesson.lesson.lessonName}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Student's email: </strong>
                    {bookedLesson &&
                      bookedLesson.bookedLesson &&
                      bookedLesson.bookedLesson.user &&
                      bookedLesson.bookedLesson.user.email}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Student's Skype ID: </strong>
                    {bookedLesson &&
                      bookedLesson.profileStudent &&
                      bookedLesson.profileStudent.skypeId}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Student's phone number: </strong>
                    {bookedLesson &&
                      bookedLesson.profileStudent &&
                      bookedLesson.profileStudent.phoneNumber}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Order's starting time: </strong>
                    {bookedLesson &&
                      bookedLesson.bookedLesson &&
                      bookedLesson.bookedLesson.bookedTime &&
                      bookedLesson.bookedLesson.bookedTime[0] &&
                      moment(bookedLesson.bookedLesson.bookedTime[0].start)
                        .locale('en')
                        .format('h:mm, dddd, MMMM Do YYYY')}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Order's ending time:</strong>&nbsp;
                    {bookedLesson &&
                    bookedLesson.bookedLesson &&
                    bookedLesson.bookedLesson.duration &&
                    bookedLesson.bookedLesson.duration === 1800000
                      ? moment(bookedLesson.bookedLesson.bookedTime[0].start)
                          .add(30, 'minutes')
                          .locale('en')
                          .format('h:mm, dddd, MMMM Do YYYY')
                      : bookedLesson &&
                        bookedLesson.bookedLesson &&
                        bookedLesson.bookedLesson.duration &&
                        bookedLesson.bookedLesson.duration === 2700000
                      ? moment(bookedLesson.bookedLesson.bookedTime[0].start)
                          .add(45, 'minutes')
                          .locale('en')
                          .format('h:mm, dddd, MMMM Do YYYY')
                      : bookedLesson &&
                        bookedLesson.bookedLesson.duration &&
                        bookedLesson.bookedLesson.duration === 3600000
                      ? moment(bookedLesson.bookedLesson.bookedTime[0].start)
                          .add(60, 'minutes')
                          .locale('en')
                          .format('h:mm, dddd, MMMM Do YYYY')
                      : null}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
          <CardActions>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <Button
                  onClick={() =>
                    handleCancelLesson(bookedLesson.bookedLesson._id)
                  }
                  variant="contained"
                  style={{
                    backgroundColor: '#f45014',
                    color: 'white',
                  }}
                >
                  <CancelIcon />
                  &nbsp;Cancel order
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  bookingCalendarStudent: state.bookingCalendarStudent,
})

export default connect(mapStateToProps, {
  getBookedLessonById,
  confirmBookedLesson,
  cancelBookedLesson,
})(BookedLessonInfo)
