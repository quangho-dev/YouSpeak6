import React, { useState, useEffect } from 'react'
import { Grid, Button, Typography } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getTeachers } from '../../actions/teachersList'
import TeacherInfo from './TeacherInfo'
import Spinner from '../../components/ui/Spinner'

const TeachersListScreen = () => {
  const [visible, setVisible] = useState(10)

  const dispatch = useDispatch()

  const teachersList = useSelector((state) => state.teachersList)

  const { teachersList: teachers, loading } = teachersList

  useEffect(() => {
    dispatch(getTeachers())
  }, [dispatch])

  const handleShowMoreTeachers = () => {
    setVisible((prevValue) => prevValue + 10)
  }

  if (loading) {
    return <Spinner />
  }

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ backgroundColor: '#F0F2F5', padding: '2em 3em' }}
      spacing={1}
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
