import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { Link } from 'react-router-dom'
import { getCurrentProfile } from '../actions/profile'
import Rating from '../components/ui/Rating'
import { connect } from 'react-redux'
import Spinner from '../components/ui/Spinner'

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile: profileUser },
}) => {
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

  useEffect(() => {
    getCurrentProfile()
  }, [getCurrentProfile])

  return (
    <>
      {user === null || profileUser === null ? (
        <Spinner />
      ) : (
        <Grid container direction="column" className="container">
          <Grid item style={{ alignSelf: 'center' }}>
            <Typography
              variant="h4"
              style={{ textTransform: 'uppercase', fontWeight: '600' }}
            >
              Trang chính
            </Typography>
          </Grid>

          <Grid item style={{ marginBottom: '1em' }}>
            <Typography variant="h4">Xin chào {user && user.name}</Typography>
          </Grid>
          <Grid item style={{ alignSelf: 'flex-start' }}>
            <Grid container direction="column" alignItems="center">
              <Grid item>
                {user && (
                  <Chip
                    label={`ID: ${user._id}`}
                    style={{ marginBottom: '1em' }}
                  />
                )}
              </Grid>

              <Grid item>
                {profileUser && (
                  <Avatar
                    src={profileUser.imageAvatar}
                    style={{
                      width: '70px',
                      height: '70px',
                      marginBottom: '1em',
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>

          {user && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1">
                    <strong>{user.name}</strong>
                  </Typography>
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
                <strong>Địa chỉ:</strong>&nbsp;{profileUser.address}
              </Typography>
            </Grid>
          )}
          {profileUser && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1">
                    <strong>Trình độ tiếng Anh:</strong>
                  </Typography>
                </Grid>
                <Grid item style={{ marginLeft: '0.5em' }}>
                  <Rating englishLevel={profileUser.englishLevel} />
                </Grid>
              </Grid>
            </Grid>
          )}
          {profileUser && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Typography variant="body1">
                <strong>ID Skype:</strong>&nbsp;
              </Typography>
            </Grid>
          )}
          {profileUser && (
            <Grid item style={{ marginBottom: '1em' }}>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography variant="body1">
                    <strong>Thông tin thêm:</strong>
                  </Typography>
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
      )}
    </>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard)
