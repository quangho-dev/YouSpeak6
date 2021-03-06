import React, { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import logo from '../assets/eagleLogo.png'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import { Link } from 'react-router-dom'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { logout } from '../actions/auth'

function ElevationScroll(props) {
  const { children } = props

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  })

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  })
}

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
  logo: {
    height: '5em',
    [theme.breakpoints.down('md')]: {
      height: '5em',
    },
    [theme.breakpoints.down('xs')]: {
      height: '3.5em',
    },
    background: 'transparent',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
    marginRight: '2em',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  drawerIcon: {
    height: '50px',
    width: '50px',
    color: 'white',
  },
  drawerIconContainer: {
    marginLeft: 'auto',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.green,
  },
  drawerAvatar: {
    backgroundColor: 'white',
  },
  drawerItem: {
    ...theme.typography.tab,
    color: '#444',
    opacity: 0.7,
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1,
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  appbarLoggedIn: {
    zIndex: theme.zIndex.modal + 1,
    backgroundColor: 'white',
  },
  avatar: {
    margin: '0.7em',
    backgroundColor: theme.palette.common.green,
  },
  form: {
    maxWidth: '22em',
  },
  formControl: {
    marginBottom: '1em',
  },
  closeButton: {
    position: 'absolute',
    right: '1em',
    top: '1em',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    color: '#555',
    '&:hover': {
      opacity: 1,
      color: '#555',
    },
  },
}))

export default function Header(props) {
  const classes = useStyles()
  const theme = useTheme()
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { isAuthenticated, user } = auth

  const profile = useSelector((state) => state.profile)
  const { profile: profileUser } = profile

  const profileTeacher = useSelector((state) => state.profileTeacher)
  const { profileTeacher: profileTeacherRedux } = profileTeacher

  const [openDrawer, setOpenDrawer] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClose = () => {
    setAnchorEl(null)
  }

  const onMouseOver = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const logoutHandler = () => {
    dispatch(logout())
    setAnchorEl(null)
  }

  const tabs = (
    <Grid item container>
      <Grid item>
        <Button
          component={Link}
          to="/login"
          style={{
            color: 'white',
            marginRight: '1.5em',
            textTransform: 'none',
          }}
        >
          Đăng nhập
        </Button>
      </Grid>
      <Grid item>
        <Button
          to="/register-user"
          component={Link}
          style={{
            color: 'white',
            marginRight: '1.5em',
            textTransform: 'none',
          }}
        >
          Đăng ký
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          component={Link}
          to="/for-teacher"
          style={{ color: 'white', textTransform: 'none' }}
        >
          Dành cho giáo viên
        </Button>
      </Grid>
    </Grid>
  )

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
        style={{ width: '16em' }}
      >
        <Grid
          container
          direction="column"
          alignItems="flex-end"
          style={{ width: '14em' }}
        >
          <Grid item>
            <div className={classes.toolbarMargin} />
          </Grid>
          <Grid
            item
            style={{
              borderBottom: '1px solid #333',
            }}
          >
            <Button
              component={Link}
              to="/login"
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
              variant="text"
            >
              Đăng nhập
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to="/register"
              style={{
                color: 'white',
                textTransform: 'none',
                marginRight: '1.5em',
              }}
              variant="text"
            >
              Đăng ký
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              component={Link}
              to="/for-teacher"
              style={{ color: 'white', textTransform: 'none' }}
            >
              Dành cho giáo viên
            </Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  )
  // tabs when logged in
  const tabsLoggedIn = (
    <Grid item container alignItems="center">
      {user && user.role !== 'teacher' && (
        <Grid item>
          <Button
            component={Link}
            to="/teachers/english"
            variant="text"
            style={{
              color: '#333',
              textTransform: 'none',
              marginRight: '1.5em',
            }}
          >
            Tìm một giáo viên
          </Button>
        </Grid>
      )}

      <Grid item>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onMouseOver={onMouseOver}
        >
          {profileUser && profileUser.imageAvatar !== null ? (
            <Avatar
              style={{ width: '3em', height: '3em', borderRadius: '50%' }}
              src={profileUser.imageAvatar}
              alt="image avatar"
            />
          ) : profileTeacherRedux &&
            profileTeacherRedux.teacherAvatar !== null ? (
            <Avatar
              style={{ width: '3em', height: '3em', borderRadius: '50%' }}
              src={profileTeacherRedux.teacherAvatar}
              alt="image avatar"
            />
          ) : null}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          MenuListProps={{
            onMouseLeave: handleClose,
          }}
          elevation={0}
          style={{ zIndex: 1302 }}
          classes={{ paper: classes.menu }}
        >
          <MenuItem
            component={Link}
            classes={{ root: classes.menuItem }}
            onClick={handleClose}
            to="/create-profile"
            disableRipple
          >
            Profile
          </MenuItem>
          <MenuItem classes={{ root: classes.menuItem }} onClick={handleClose}>
            My account
          </MenuItem>
          <MenuItem
            classes={{ root: classes.menuItem }}
            onClick={logoutHandler}
          >
            Đăng xuất
          </MenuItem>
        </Menu>
      </Grid>
    </Grid>
  )

  return (
    <Fragment>
      {isAuthenticated ? (
        <>
          <ElevationScroll>
            <AppBar position="fixed" className={classes.appbarLoggedIn}>
              <Toolbar variant="dense" disableGutters>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  style={{ paddingLeft: '3em', paddingRight: '3em' }}
                >
                  <Grid item>
                    <Button
                      component={Link}
                      to="/"
                      disableRipple
                      className={classes.logoContainer}
                    >
                      {logo && (
                        <img
                          alt="company logo"
                          className={classes.logo}
                          src={logo}
                        />
                      )}
                    </Button>
                  </Grid>
                  <Grid item>{matches ? drawer : tabsLoggedIn}</Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </>
      ) : (
        <>
          <ElevationScroll>
            <AppBar position="fixed" className={classes.appbar}>
              <Toolbar variant="dense" disableGutters>
                <Grid
                  container
                  justify="space-between"
                  alignItems="center"
                  style={{ paddingLeft: '3em', paddingRight: '3em' }}
                >
                  <Grid item>
                    <Button
                      component={Link}
                      to="/"
                      disableRipple
                      className={classes.logoContainer}
                    >
                      <img
                        alt="company logo"
                        className={classes.logo}
                        src={logo}
                      />
                    </Button>
                  </Grid>
                  <Grid item>{matches ? drawer : tabs}</Grid>
                </Grid>
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </>
      )}
    </Fragment>
  )
}
