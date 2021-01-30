import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Grid, Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTeachers } from '../../actions/teachersList'
import TeacherInfo from './TeacherInfo'

const useStyles = makeStyles((theme) => ({
  rowContainer: {
    padding: '0 6em',
  },
}))

const TeachersListScreen = () => {
  const [visible, setVisible] = useState(2)

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { user } = auth

  const teachersList = useSelector((state) => state.teachersList)

  const { teachersList: teachers } = teachersList

  const classes = useStyles()

  useEffect(() => {
    dispatch(getTeachers())
  }, [getTeachers, dispatch])

  const handleShowMoreTeachers = () => {
    setVisible((prevValue) => prevValue + 2)
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.rowContainer}
    >
      <Grid item>
        <Typography variant="h5">
          Hãy chọn một giáo viên tốt nhất cho bạn:
        </Typography>
      </Grid>
      <Grid item container direction="column" alignItems="center" spacing={2}>
        {teachers.slice(0, visible).map((teacher) => (
          <Grid item style={{ width: '100%' }} key={teacher._id}>
            <TeacherInfo teacher={teacher} />
          </Grid>
        ))}
      </Grid>

      <Grid item>
        <Button
          onClick={handleShowMoreTeachers}
          variant="contained"
          color="primary"
          style={{ color: 'white', margin: '2em 0' }}
          disableRipple
        >
          Hiển thị thêm
        </Button>
      </Grid>
    </Grid>
  )
}

export default TeachersListScreen
