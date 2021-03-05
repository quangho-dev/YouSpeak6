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
import Spinner from '../../ui/Spinner'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import convertMillisecondsToMinutes from '../../../utils/convertMillisecondsToMinutes'
import moment from 'moment'

const BookedLessonsTable = ({ bookedLessons, loading }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>STT</TableCell>
            <TableCell>Tên người học</TableCell>
            <TableCell>Kiểu bài học</TableCell>
            <TableCell>Giờ bắt đầu</TableCell>
            <TableCell>Thời lượng</TableCell>
            <TableCell>Tình trạng</TableCell>
            <TableCell>{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <Spinner />
          ) : (
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
                    : lesson.isFinished && lesson.isConfirmed
                    ? 'Đã hoàn thành'
                    : 'Đang chờ xác nhận'}
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
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BookedLessonsTable
