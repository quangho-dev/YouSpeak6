import React, { useState, useEffect, useRef } from 'react'
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
import { format } from 'date-fns'
import { Card } from '@material-ui/core'

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
  formControl: {
    marginBottom: '0.5em',
  },
  degreeImage: {
    width: '100%',
    height: 'auto',
  },
  expImageCard: {
    maxWidth: 300,
  },
  expImage: {
    width: '100%',
    height: 'auto',
  },
}))

const DashboardTeacher = () => {
  const [videoFilePath, setVideoFilePath] = useState(null)

  console.log('day la videofilepath:', videoFilePath)

  const classes = useStyles()

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { user } = auth

  const profileTeacher = useSelector((state) => state.profileTeacher)
  const { profileTeacher: profileTeacherRedux } = profileTeacher

  useEffect(() => {
    dispatch(getCurrentProfileTeacher())
  }, [getCurrentProfileTeacher, dispatch])

  const renderImages = (source) => {
    return source.map((photo, index) => {
      return (
        <Grid item className={classes.expImageCard} key={photo}>
          <Card>
            <img src={photo} className={classes.expImage} />
          </Card>
        </Grid>
      )
    })
  }

  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <div className={classes.toolbarMargin} />
      <Grid container direction="column" className={classes.paddingContainer}>
        <Grid item style={{ marginBottom: '1em' }}>
          <Typography variant="h4">
            Xin chào {user && user !== '' && user.name}
          </Typography>
        </Grid>
        <Grid item>
          {user && (
            <Chip
              label={`ID: ${user._id.slice(0, 7)}`}
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

        {user && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1">{user.name}</Typography>
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
              {`Kiểu giáo viên: `}
              {profileTeacherRedux.typeOfTeacher === 'commutor'
                ? 'Giáo viên cộng đồng'
                : 'Giáo viên chuyên nghiệp'}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.dateOfBirth !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              {`Ngày tháng năm sinh:`}{' '}
              {format(new Date(profileTeacherRedux.dateOfBirth), 'dd/MM/yyyy')}
            </Typography>
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
              {`Phần mềm video call dùng để dạy:`}{' '}
              {profileTeacherRedux.communicationTool.join(', ')}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.introduction !== null && (
          <Grid item>
            <Typography variant="body1">{`Giới thiệu về giáo viên: ${profileTeacherRedux.introduction}`}</Typography>
          </Grid>
        )}

        {profileTeacherRedux &&
          profileTeacherRedux.video !== null &&
          profileTeacherRedux.thumbnail !== null && (
            <Grid item className={classes.formControl}>
              <Typography variant="body1" style={{ margin: '0.5em 0' }}>
                Video giới thiệu về giáo viên:
              </Typography>
              <ReactPlayer
                url={`/${profileTeacherRedux.video}`}
                controls
                playing
                light={`/${profileTeacherRedux.thumbnail}`}
              />
            </Grid>
          )}

        {profileTeacherRedux &&
          Boolean(profileTeacherRedux.degreeImages) &&
          profileTeacherRedux.typeOfTeacher !== 'commutor' && (
            <>
              <Typography variant="body1" style={{ margin: '0.5em 0' }}>
                Hình ảnh bằng cấp của giáo viên:
              </Typography>
              <Grid container justify="center" alignItems="center" spacing={3}>
                {renderImages(profileTeacherRedux.degreeImages)}
              </Grid>
            </>
          )}

        {profileTeacherRedux &&
          profileTeacherRedux.expImages !== '' &&
          profileTeacherRedux.typeOfTeacher !== 'commutor' && (
            <>
              <Typography variant="body1" style={{ margin: '0.5em 0' }}>
                Hình ảnh kinh nghiệm của giáo viên:
              </Typography>
              <Grid container justify="center" alignItems="center" spacing={3}>
                {renderImages(profileTeacherRedux.expImages)}
              </Grid>
            </>
          )}
      </Grid>
    </div>
  )
}
export default DashboardTeacher
