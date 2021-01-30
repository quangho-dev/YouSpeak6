import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/styles'
import { Link, Redirect } from 'react-router-dom'
import { getLessons } from '../../actions/lessons'
import LessonItem from './LessonItem'

const Lessons = () => {
  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)

  const { lessons } = lesson

  useEffect(() => {
    dispatch(getLessons())
  }, [dispatch, getLessons])

  return (
    <>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h4">
            Quản lý các khóa học của giáo viên:
          </Typography>
        </Grid>
        <Grid item container direction="column" alignItems="center">
          {lessons.map((lesson) => (
            <Grid item key={lesson._id}>
              <LessonItem lesson={lesson} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  )
}

export default Lessons
