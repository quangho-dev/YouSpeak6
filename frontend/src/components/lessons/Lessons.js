import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getLessons } from '../../actions/lessons'
import LessonTable from './LessonTable'
import { Link } from 'react-router-dom'
import MyButton from '../ui/MyButton'
import AddIcon from '@material-ui/icons/Add'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import Spinner from '../ui/Spinner'

const Lessons = () => {
  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)

  const { lessons, loading } = lesson

  useEffect(() => {
    dispatch(getLessons())
  }, [dispatch])

  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Quản lý các khóa học của giáo viên:
          </Typography>
        </Grid>
        <Grid item style={{ marginTop: '1em' }}>
          <LessonTable lessons={lessons} />
        </Grid>
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          spacing={1}
          style={{ marginTop: '1em' }}
        >
          <Grid item>
            <MyButton component={Link} to="/teachers/dashboard">
              <ArrowBackIcon />
              &nbsp; Trở về dashboard
            </MyButton>
          </Grid>
          <Grid item>
            <MyButton component={Link} to="/teachers/add-a-lesson">
              <AddIcon />
              &nbsp; Thêm bài học
            </MyButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Lessons
