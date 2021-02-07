import React, { useEffect } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getLessons } from '../../actions/lessons'
<<<<<<< HEAD
import LessonsTable from './LessonsTable'

const useStyles = makeStyles({
  lessonsBackground: {
    backgroundColor: '#f7f7f7',
    padding: '3em 0',
  },
})
=======
import LessonTable from './LessonTable'
import { Link } from 'react-router-dom'
import MyButton from '../ui/MyButton'
import AddIcon from '@material-ui/icons/Add'
>>>>>>> applyFireBaseAuth

const Lessons = () => {
  const dispatch = useDispatch()

  const classes = useStyles()

  const lesson = useSelector((state) => state.lesson)

  const { lessons } = lesson

  useEffect(() => {
    dispatch(getLessons())
  }, [dispatch])

  const handleAddLesson = () => {}

  return (
<<<<<<< HEAD
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
=======
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
>>>>>>> applyFireBaseAuth
      </Grid>
    </Grid>
  )
}

export default Lessons
