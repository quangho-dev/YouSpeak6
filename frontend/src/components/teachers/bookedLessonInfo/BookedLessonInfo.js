import React, { useEffect } from 'react'
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@material-ui/core'
import MyButton from '../../ui/MyButton'
import Spinner from '../../ui/Spinner'
import {
  getBookedLessonById,
  cancelBookedLesson,
} from '../../../actions/bookingCalendarStudent'
import { confirmBookedLesson } from '../../../actions/bookingCalendar'
import { connect } from 'react-redux'
import moment from 'moment'
import CancelIcon from '@material-ui/icons/Cancel'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { useConfirm } from 'material-ui-confirm'

const BookedLessonInfo = ({
  getBookedLessonById,
  confirmBookedLesson,
  cancelBookedLesson,
  match,
  bookingCalendarStudent: { loading, bookedLesson },
  history,
}) => {
  const handleConfirmBookedLesson = (lessonBookedId) => {
    confirmBookedLesson(lessonBookedId)
    history.push('/teachers/booked-lessons-manager')
  }

  const confirm = useConfirm()

  const handleCancelLesson = (bookedLessonId) => {
    confirm({
      description: 'Nhấn đồng ý để hủy bài học.',
      title: 'Bạn có đồng ý hủy bài học không?',
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
          Thông tin bài học
        </Typography>
      </Grid>

      <Grid item style={{ marginTop: '1.5em' }}>
        <Card style={{ padding: '1em' }}>
          <CardContent>
            {loading ? (
              <Spinner />
            ) : (
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="body1">
                    <strong>Tên người học: </strong>
                    {bookedLesson &&
                      bookedLesson.user &&
                      bookedLesson.user.name}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Kiểu bài học: </strong>
                    {bookedLesson &&
                      bookedLesson.lesson &&
                      bookedLesson.lesson.lessonName}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Thời gian bắt đầu: </strong>
                    {bookedLesson &&
                      bookedLesson.bookedTime &&
                      bookedLesson.bookedTime[0] &&
                      moment(bookedLesson.bookedTime[0].start).format(
                        'HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY'
                      )}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Thời gian kết thúc:</strong>&nbsp;
                    {bookedLesson && bookedLesson.duration === 1800000
                      ? moment(bookedLesson.bookedTime[0].start)
                          .add(30, 'minutes')
                          .format('HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY')
                      : bookedLesson && bookedLesson.duration === 2700000
                      ? moment(bookedLesson.bookedTime[0].start)
                          .add(45, 'minutes')
                          .format('HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY')
                      : bookedLesson && bookedLesson.duration === 3600000
                      ? moment(bookedLesson.bookedTime[0].start)
                          .add(60, 'minutes')
                          .format('HH [giờ] mm [phút], [ngày] DD, MMMM, YYYY')
                      : null}
                  </Typography>
                </Grid>

                <Grid item>
                  <Typography variant="body1">
                    <strong>Email: </strong>
                    {bookedLesson &&
                      bookedLesson.user &&
                      bookedLesson.user.email}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
          <CardActions>
            <Grid container justify="center" alignItems="center" spacing={2}>
              <Grid item>
                <Button
                  onClick={() => handleCancelLesson(bookedLesson._id)}
                  variant="contained"
                  style={{
                    backgroundColor: '#f45014',
                    color: 'white',
                  }}
                >
                  <CancelIcon />
                  &nbsp;Hủy bài học
                </Button>
              </Grid>
              <Grid item>
                <MyButton
                  onClick={() => handleConfirmBookedLesson(bookedLesson._id)}
                >
                  <CheckCircleIcon />
                  &nbsp;Xác nhận bài học
                </MyButton>
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
