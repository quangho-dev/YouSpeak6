import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import { getBookedLessons } from '../../../actions/bookingCalendarStudent'
import Spinner from '../../ui/Spinner'
import BookedLessonsTable from './BookedLessonsTable'

const BookedLessonsManager = ({
  bookingCalendarStudent: { bookedLessons, loading },
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
        {loading ? (
          <Spinner />
        ) : !bookedLessons[0] ? (
          <Typography variant="body1">Chưa có bài học nào được đặt.</Typography>
        ) : (
          <BookedLessonsTable bookedLessons={bookedLessons} />
        )}
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  bookingCalendarStudent: state.bookingCalendarStudent,
})

export default connect(mapStateToProps, { getBookedLessons })(
  BookedLessonsManager
)
