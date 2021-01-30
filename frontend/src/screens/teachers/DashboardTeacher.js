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
import ShowMoreText from 'react-show-more-text'
import EditIcon from '@material-ui/icons/Edit'
import MenuBookIcon from '@material-ui/icons/MenuBook'

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
  subHeader: {
    fontSize: '17px',
    fontWeight: '500',
  },
}))

const DashboardTeacher = () => {
  const [videoFilePath, setVideoFilePath] = useState(null)

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

  const executeOnClick = (isExpanded) => {}

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

        <Grid item style={{ marginBottom: '1em' }}>
          <Grid item style={{ marginLeft: '0.5em' }}>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/teachers/create-profile"
              style={{ color: 'white' }}
            >
              <EditIcon fontSize="small" />
              &nbsp;Chỉnh sửa profile
            </Button>
          </Grid>
        </Grid>

        <Grid item style={{ marginBottom: '1em' }}>
          <Grid item style={{ marginLeft: '0.5em' }}>
            <Button
              component={Link}
              variant="contained"
              color="primary"
              to="/teachers/lessons"
              style={{ color: 'white' }}
            >
              <MenuBookIcon fontSize="small" />
              &nbsp;Chỉnh sửa các bài học
            </Button>
          </Grid>
        </Grid>

        {profileTeacherRedux && profileTeacherRedux.typeOfTeacher !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              <span className={classes.subHeader}>Kiểu giáo viên:</span>
              {profileTeacherRedux.typeOfTeacher === 'commutor'
                ? ' Giáo viên cộng đồng'
                : ' Giáo viên chuyên nghiệp'}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.dateOfBirth !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              <span className={classes.subHeader}>Ngày tháng năm sinh: </span>
              {format(new Date(profileTeacherRedux.dateOfBirth), 'dd/MM/yyyy')}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.hometown !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              <span className={classes.subHeader}>Quốc Tịch: </span>{' '}
              {profileTeacherRedux.hometown}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.communicationTool !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              <span className={classes.subHeader}>
                Phần mềm video call dùng để dạy:{' '}
              </span>
              {profileTeacherRedux.communicationTool.join(', ')}
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux && profileTeacherRedux.introduction !== null && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1" className={classes.subHeader}>
              Giới thiệu về giáo viên:
            </Typography>
            <Typography variant="body1">
              <ShowMoreText
                lines={3}
                more="Xem thêm"
                less="Thu lại"
                className="content-css"
                anchorClass="my-anchor-css-class"
                onClick={executeOnClick}
                expanded={false}
                width={700}
              >
                {profileTeacherRedux.introduction}
              </ShowMoreText>
            </Typography>
          </Grid>
        )}

        {profileTeacherRedux &&
          profileTeacherRedux.video !== null &&
          profileTeacherRedux.thumbnail !== null && (
            <Grid
              item
              className={classes.formControl}
              style={{ marginBottom: '1em' }}
            >
              <Typography
                variant="body1"
                style={{ margin: '0.5em 0' }}
                className={classes.subHeader}
              >
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
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography
                variant="body1"
                className={classes.subHeader}
                style={{ margin: '0.5em 0' }}
              >
                Hình ảnh bằng cấp của giáo viên:
              </Typography>
              <Grid container justify="center" alignItems="center" spacing={3}>
                {renderImages(profileTeacherRedux.degreeImages)}
              </Grid>
            </Grid>
          )}

        {profileTeacherRedux &&
          profileTeacherRedux.expImages !== '' &&
          profileTeacherRedux.typeOfTeacher !== 'commutor' && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography
                variant="body1"
                className={classes.subHeader}
                style={{ margin: '0.5em 0' }}
              >
                Hình ảnh kinh nghiệm của giáo viên:
              </Typography>
              <Grid container justify="center" alignItems="center" spacing={3}>
                {renderImages(profileTeacherRedux.expImages)}
              </Grid>
            </Grid>
          )}
      </Grid>
    </div>
  )
}
export default DashboardTeacher
