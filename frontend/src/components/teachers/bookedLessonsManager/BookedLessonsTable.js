import React from 'react'
import {
  TableContainer,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import MyButton from '../../ui/MyButton'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import convertMillisecondsToMinutes from '../../../utils/convertMillisecondsToMinutes'
import moment from 'moment'
import { useConfirm } from 'material-ui-confirm'
import { connect } from 'react-redux'
import { confirmBookedLesson } from '../../../actions/bookingCalendar'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

const BookedLessonsTable = ({
  bookedLessons,
  loading,
  confirmBookedLesson,
}) => {
  const confirm = useConfirm()

  const handleConfirmBookedLesson = (bookedLessonId) => {
    confirm({
      description: 'Nhấn đồng ý sẽ xác nhận bài học.',
      title: 'Bạn có muốn xác nhận bài học không?',
    })
      .then(() => {
        confirmBookedLesson(bookedLessonId)
      })
      .catch(() => {})
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Student's name</TableCell>
            <TableCell>Type of lesson</TableCell>
            <TableCell>Starting time</TableCell>
            <TableCell>Lesson's duration</TableCell>
            <TableCell>Lesson's state</TableCell>
            <TableCell>{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookedLessons &&
            bookedLessons.map((lesson, index) => (
              <TableRow
                key={lesson._id}
                style={
                  index % 2
                    ? { background: '#F3F5F7' }
                    : { background: 'white' }
                }
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>{lesson.user.name}</TableCell>
                <TableCell>{lesson.lesson.lessonName}</TableCell>
                <TableCell>
                  {moment(lesson.bookedTime[0].start).format(
                    'HH [giờ] mm [phút], [ngày] DD, MMMM'
                  )}
                </TableCell>
                <TableCell>
                  {convertMillisecondsToMinutes(lesson.duration)}&nbsp;phút
                </TableCell>
                <TableCell>
                  {lesson.isConfirmed && !lesson.isFinished
                    ? 'Đã xác nhận'
                    : lesson.isCanceled
                    ? 'Đã hủy'
                    : lesson.isFinished && lesson.isConfirmed
                    ? 'Đã hoàn thành'
                    : 'Đang chờ xác nhận'}
                </TableCell>
                <TableCell>
                  <MyButton
                    onClick={() => handleConfirmBookedLesson(lesson._id)}
                    disabled={lesson.isConfirmed === true}
                  >
                    <CheckCircleIcon />
                    &nbsp;Xác nhận
                  </MyButton>
                </TableCell>
                <TableCell>
                  <MyButton
                    component={Link}
                    to={`/teachers/bookedLesson/${lesson._id}`}
                  >
                    <FindInPageIcon />
                    &nbsp;Xem thêm
                  </MyButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const mapStateToProps = (state) => ({
  bookingCalendarStudent: state.bookingCalendarStudent,
})

export default connect(mapStateToProps, { confirmBookedLesson })(
  BookedLessonsTable
)
