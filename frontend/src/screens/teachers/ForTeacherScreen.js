import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Button from '@material-ui/core/Button'

const ForTeacherScreen = () => {
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
    linkText: {
      textTransform: 'uppercase',
      '&:hover, &:visited, &:active': {
        textTransform: 'uppercase',
        color: 'inherit',
      },
    },
  }))

  const classes = useStyles()

  return (
    <div style={{ backgroundColor: '#f7f7f7', minHeight: '100vh' }}>
      <div className={classes.toolbarMargin} />
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid
          item
          container
          alignItems="center"
          className={classes.paddingContainer}
        >
          <Grid item>
            <Link to="/">
              <ArrowBackIcon fontSize="large" color="primary" />
            </Link>
          </Grid>
          <Grid item>
            <Typography
              variant="body2"
              component={Link}
              to="/"
              style={{
                fontWeight: '600',
                marginLeft: '0.5em',
                textDecoration: 'none',
              }}
              className={classes.linkText}
            >
              Trở về trang chủ
            </Typography>
          </Grid>
        </Grid>
        <Grid item style={{ marginTop: '6em' }}>
          <Grid container justify="center" alignItems="center" spacing={4}>
            <Grid item>
              <Button
                component={Link}
                to="/teachers/login"
                variant="contained"
                color="primary"
                size="large"
                style={{ color: 'white', fontWeight: '600' }}
                disableRipple
              >
                Đăng nhập tài khoản
              </Button>
            </Grid>
            <Grid item>
              <Button
                component={Link}
                to="/teachers/register-teacher"
                variant="contained"
                color="primary"
                size="large"
                style={{ color: 'white', fontWeight: '600' }}
                disableRipple
              >
                Đăng ký tài khoản
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default ForTeacherScreen
