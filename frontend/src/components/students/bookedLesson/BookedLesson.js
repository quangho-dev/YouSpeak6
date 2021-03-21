import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Button } from '@material-ui/core'
import BookedLessonInfo from './BookedLessonInfo'
import TeacherInfo from './TeacherInfo'
import {
  getBookedLessonById,
  cancelBookedLesson,
} from '../../../actions/bookingCalendarStudent'
import { getProfileTeacherById } from '../../../actions/profileTeacher'
import { connect } from 'react-redux'
import CancelIcon from '@material-ui/icons/Cancel'
import Spinner from '../../ui/Spinner'
import { useConfirm } from 'material-ui-confirm'
import { addHours, compareAsc } from 'date-fns'
import moment from 'moment'

const BookedLesson = ({
  match,
  getBookedLessonById,
  getProfileTeacherById,
  cancelBookedLesson,
  bookingCalendarStudent: { loading, bookedLesson },
  profileTeacher: {
    profileTeacher: profileTeacherReduxState,
    loading: loadingProfileTeacher,
  },
  history,
}) => {
  const [teacherId, setTeacherId] = useState('')

  const handleCancelLesson = (bookedLessonId) => {
    confirm({
      description: 'Nhấn đồng ý sẽ hủy bài học.',
      title: 'Bạn có muốn hủy bài học không?',
    })
      .then(() => {
        cancelBookedLesson(bookedLessonId)
        history.push('/students/lessons-manager')
      })
      .catch(() => {})
  }

  const confirm = useConfirm()

  useEffect(() => {
    getBookedLessonById(match.params.bookedLessonId)
    setTeacherId(bookedLesson.teacher)
    if (teacherId) getProfileTeacherById(teacherId)
  }, [
    match.params.bookedLessonId,
    getBookedLessonById,
    bookedLesson.teacher,
    getProfileTeacherById,
    teacherId,
  ])

  const isAfterNext24Hours = (time) => {
    const deadlineToCancel = addHours(new Date(time), 24)
    const res = compareAsc(new Date(), deadlineToCancel)
    if (res === 1) {
      return true
    }
    return false
  }

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
          style={{ textTransform: 'uppercase', fontWeight: '600' }}
        >
          Thông tin về bài học
        </Typography>
      </Grid>

      <Grid
        container
        item
        justify="center"
        alignItems="center"
        spacing={2}
        style={{ marginTop: '1em' }}
      >
        <Grid item>
          {loading || !bookedLesson || !bookedLesson._id ? (
            <Spinner />
          ) : (
            <BookedLessonInfo bookedLessonProps={bookedLesson} />
          )}
        </Grid>

        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Grid item>
              {loadingProfileTeacher || !profileTeacherReduxState ? (
                <Spinner />
              ) : (
                <TeacherInfo profileTeacher={profileTeacherReduxState} />
              )}
            </Grid>

            <Grid item>
              <Button
                onClick={() => handleCancelLesson(bookedLesson._id)}
                variant="contained"
                color="secondary"
                style={{
                  margin: '1.5em 0 0.5em',
                  color: 'white',
                }}
                disabled={isAfterNext24Hours(bookedLesson.createdAt)}
              >
                <CancelIcon />
                &nbsp;Hủy bài học
              </Button>
            </Grid>

            <Grid item>
              <Typography variant="body1">
                * Bạn chỉ có thể hủy bài học trước 24 tiếng trước khi bắt đầu
                bài học.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

BookedLesson.propTypes = {
  getBookedLessonById: PropTypes.func.isRequired,
  bookingCalendarStudent: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  bookingCalendarStudent: state.bookingCalendarStudent,
  profileTeacher: state.profileTeacher,
})

export default connect(mapStateToProps, {
  getBookedLessonById,
  getProfileTeacherById,
  cancelBookedLesson,
})(BookedLesson)
