import React from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  Grid,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MyButton from '../ui/MyButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const LessonTable = ({ lessons }) => {
  const classes = useStyles()

  const handleEditClick = () => {}

  const handleDeleteClick = () => {}

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tên bài học</TableCell>
            <TableCell align="right">Nội dung</TableCell>
            <TableCell align="right">{''}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lessons &&
            lessons.map((lesson) => (
              <TableRow key={lesson._id}>
                <TableCell component="th" scope="row">
                  {lessons.lessonName}
                </TableCell>
                <TableCell align="right">{lesson.content}</TableCell>
                <TableCell align="right">
                  <Grid
                    container
                    justify="center"
                    alignItems="center"
                    spacing={1}
                  >
                    <Grid item>
                      <MyButton onClick={handleEditClick}>
                        <EditIcon />
                        &nbsp;Sửa
                      </MyButton>
                    </Grid>
                    <Grid item>
                      <MyButton onClick={handleDeleteClick}>
                        <DeleteIcon />
                        &nbsp;Xóa
                      </MyButton>
                    </Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default LessonTable
