import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { CircularProgress, Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'

const TeacherPrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, user, loading },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        loading || !user ? (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CircularProgress style={{ width: '60px' }} />
          </div>
        ) : user.role !== 'teacher' ? (
          <Grid container justify="center">
            <Grid item>
              <Typography variant="h4">
                Xin lỗi, bạn không có quyền truy cập vào trang này.
              </Typography>
            </Grid>
          </Grid>
        ) : isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/teachers/login" />
        )
      }
    />
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(TeacherPrivateRoute)
