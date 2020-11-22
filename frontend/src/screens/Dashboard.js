import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import EditProfileDialog from './EditProfileDialog'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../actions/profile'
import Rating from '../components/ui/Rating'

const Dashboard = () => {
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
  const classes = useStyles()

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { user } = auth

  const profile = useSelector((state) => state.profile)
  const { profile: profileUser } = profile

  useEffect(() => {
    dispatch(getCurrentProfile())
  }, [getCurrentProfile, dispatch])

  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <div className={classes.toolbarMargin} />
      <Grid container direction="column" className={classes.paddingContainer}>
        <Grid item style={{ marginBottom: '1em' }}>
          <Typography variant="h4">Xin chào {user && user.name}</Typography>
        </Grid>
        <Grid item>
          {user && (
            <Chip
              label={`ID: ${user._id.slice(0, 7)}`}
              style={{ marginBottom: '1em' }}
            />
          )}
        </Grid>
        <Grid item>
          {profileUser && (
            <Avatar
              src={profileUser.imageAvatar}
              style={{
                marginLeft: '5em',
                width: '70px',
                height: '70px',
                marginBottom: '1em',
              }}
            />
          )}
        </Grid>
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
                  to="/create-profile"
                  style={{ color: 'white' }}
                >
                  Chỉnh sửa profile
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
        {profileUser && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="body1">
              {`Địa chỉ: ${profileUser.address}`}
            </Typography>
          </Grid>
        )}
        {profileUser && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1">Trình độ tiếng Anh: </Typography>
              </Grid>
              <Grid item style={{ marginLeft: '0.5em' }}>
                <Rating englishLevel={profileUser.englishLevel} />
              </Grid>
            </Grid>
          </Grid>
        )}
        {profileUser && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1">
                  Các phần mềm dùng để học:{' '}
                </Typography>
              </Grid>
              <Grid item style={{ marginLeft: '0.5em' }}>
                <Typography variant="body1">
                  {profileUser.communicationTool.join(', ')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
        {profileUser && (
          <Grid item style={{ marginBottom: '1em' }}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body1">Thông tin thêm: </Typography>
              </Grid>
              <Grid item style={{ marginLeft: '0.5em' }}>
                <Typography variant="body1">
                  {profileUser.introduction}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  )
}
export default Dashboard
