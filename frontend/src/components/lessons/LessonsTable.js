import React from 'react'
import {
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MyButton from '../ui/MyButton'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const createData = (stt, lessonName, content) => {
  return {
    stt,
    lessonName,
    content,
  }
}

const rows = [
  createData(1, 'Tiếng Anh giao tiếp', 'Tăng phản xạ'),
  createData(2, 'Tiếng Anh cho dân IT', 'Tăng vốn từ vựng chuyên ngành'),
]

const LessonsTable = ({ lessons }) => {
  const handleClickEdit = () => {}

  const handleClickDelete = () => {}

  const classes = useStyles()

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Tên bài học</TableCell>
            <TableCell align="right">Nội dung</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.lessonName}>
              <TableCell component="th" scope="row">
                {row.lessonName}
              </TableCell>
              <TableCell align="right">{row.content}</TableCell>
              <TableCell align="right">
                <Grid
                  container
                  justify="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <MyButton
                      onClick={handleClickEdit}
                      variant="contained"
                      color="primary"
                    >
                      Edit
                    </MyButton>
                  </Grid>
                  <Grid item>
                    <MyButton
                      onClick={handleClickDelete}
                      variant="contained"
                      color="primary"
                    >
                      Delete
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

export default LessonsTable
