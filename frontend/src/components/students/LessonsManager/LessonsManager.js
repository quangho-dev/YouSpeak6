import React, { useState, useEffect } from 'react'
import {
  Typography,
  Grid,
  Table,
  TableContainer,
  TableBody,
  TableHead,
  TableRow,
  Paper,
  TableCell,
} from '@material-ui/core'
import { connect } from 'react-redux'
import { getBookedLessons } from '../../../actions/bookingCalendarStudent'
import { makeStyles } from '@material-ui/styles'
import Spinner from '../../ui/Spinner'
import MyButton from '../../ui/MyButton'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import { Link } from 'react-router-dom'

const LessonsManager = ({
  bookingCalendarStudent: { bookedLessons, loading, bookedTime },
  getBookedLessons,
}) => {
  useEffect(() => {
    getBookedLessons()
  }, [getBookedLessons])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={2}
      className="container"
      style={{ padding: '2em 3em' }}
    >
      <Grid item>
        <Typography
          variant="h4"
          style={{ textTransform: 'uppercase', fontWeight: '500' }}
        >
          Quản lý bài học
        </Typography>
      </Grid>
      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>STT</TableCell>
                <TableCell>Tên bài học</TableCell>
                <TableCell>Giáo viên</TableCell>
                <TableCell align="center">Tình trạng</TableCell>
                <TableCell align="center">Xem thêm</TableCell>
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
                    <TableCell>{lesson.lesson.lessonName}</TableCell>
                    <TableCell>{lesson.teacher.name}</TableCell>
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
                        to={`/students/bookedLesson/${lesson._id}`}
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
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  bookingCalendarStudent: state.bookingCalendarStudent,
})

export default connect(mapStateToProps, { getBookedLessons })(LessonsManager)
