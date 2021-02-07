import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getLessons } from '../../actions/lessons'
import LessonTable from './LessonTable'
import { Link } from 'react-router-dom'
import MyButton from '../ui/MyButton'
import AddIcon from '@material-ui/icons/Add'

const Lessons = () => {
  const dispatch = useDispatch()

  const lesson = useSelector((state) => state.lesson)

  const { lessons } = lesson

  useEffect(() => {
    dispatch(getLessons())
  }, [dispatch])

  const handleAddLesson = () => {}

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
        <Grid item style={{ marginTop: '1em' }}>
          <MyButton
            component={Link}
            onClick={handleAddLesson}
            to="/teachers/add-a-lesson"
          >
            <AddIcon />
            &nbsp; Thêm bài học
          </MyButton>
        </Grid>
      </Grid>
    </>
  )
}

export default Lessons
