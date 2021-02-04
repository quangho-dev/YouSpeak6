import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Link, Redirect } from 'react-router-dom'
import { getLessons } from '../../actions/lessons'
import LessonsTable from './LessonsTable'

const useStyles = makeStyles({
  lessonsBackground: {
    backgroundColor: '#f7f7f7',
    padding: '3em 0',
  },
})

const Lessons = () => {
  const dispatch = useDispatch()

  const classes = useStyles()

  const lesson = useSelector((state) => state.lesson)

  const { lessons } = lesson

  useEffect(() => {
    dispatch(getLessons())
  }, [dispatch, getLessons])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.lessonsBackground}
    >
      <Grid item>
        <Typography variant="h4">
          Quản lý các khóa học của giáo viên:
        </Typography>
      </Grid>
      <Grid item>
        <LessonsTable lessons={lessons} />
      </Grid>
    </Grid>
  )
}

export default Lessons
