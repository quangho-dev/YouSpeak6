import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import { useDispatch, useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { getCurrentProfileTeacher } from '../../actions/profileTeacher'
import ReactPlayer from 'react-player'

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em',
    [theme.breakpoints.down('md')]: {
      marginBottom: '2em',
    },
    [theme.breakpoints.down('xs')]: {
      marginBottom: '2.25em',
    },
  },
  paddingContainer: {
    padding: '0 4em',
  },
}))

const DashboardTeacher = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const authTeacher = useSelector((state) => state.authTeacher)
  const { teacher } = authTeacher

  const profileTeacher = useSelector((state) => state.profileTeacher)
  const { profileTeacher: profileTeacherRedux } = profileTeacher

  useEffect(() => {
    dispatch(getCurrentProfileTeacher())
  }, [getCurrentProfileTeacher, dispatch])

  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <div className={classes.toolbarMargin} />
      <Grid container direction="column" className={classes.paddingContainer}>
        <Grid item style={{ marginBottom: '1em' }}>
          <Typography variant="h4">
            Xin chào {teacher && teacher !== '' && teacher.name}
          </Typography>
        </Grid>
        <Grid item>
          {teacher && (
            <Chip
              label={`ID: ${teacher._id.slice(0, 7)}`}
              style={{ marginBottom: '1em' }}
            />
          )}
        </Grid>
        {profileTeacherRedux && (
          <Grid item>
            <Avatar
              src={profileTeacherRedux.teacherAvatar}
              style={{
                marginLeft: '5em',
                width: '70px',
                height: '70px',
                marginBottom: '1em',
              }}
            />
          </Grid>
        )}

        {teacher && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1">{teacher.name}</Typography>
              </Grid>
              <Grid item style={{ marginLeft: '0.5em' }}>
                <Button
                  component={Link}
                  variant="contained"
                  color="primary"
                  to="/teachers/create-profile"
                  style={{ color: 'white' }}
                >
                  Chỉnh sửa profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.typeOfTeacher !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              {`Kiểu giáo viên: ${profileTeacherRedux.typeOfTeacher}`}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.dateOfBirth !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">{`Ngày tháng năm sinh: ${profileTeacherRedux.dateOfBirth}`}</Typography>
          </Grid>
        )}
        {profileTeacherRedux && profileTeacherRedux.hometown !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              {`Quốc Tịch: ${profileTeacherRedux.hometown}`}
            </Typography>
          </Grid>
        )}
        {profileTeacherRedux && profileTeacherRedux.communicationTool !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              {`Phần mềm video call dùng để dạy: ${profileTeacherRedux.communicationTool}`}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.introduction !== null && (
          <Grid item>
            <Typography variant="body1">{`Giới thiệu về giáo viên: ${profileTeacherRedux.introduction}`}</Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.video !== null && (
          <Grid item>
            <ReactPlayer url={profileTeacherRedux.video} />
          </Grid>
        )}
      </Grid>
    </div>
  )
}
export default DashboardTeacher
