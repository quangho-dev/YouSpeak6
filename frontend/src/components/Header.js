import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../assets/eagleLogo.png';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Link } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CloseIcon from '@material-ui/icons/Close';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LoginForm from './Formik/LoginForm';
import RegisterForm from './Formik/RegisterForm';

function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
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
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
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
}));

export default function Header(props) {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const userLogin = useSelector((state) => state.userLogin)
  const {userInfo}  = userLogin

  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  const [openSignIn, setOpenSignIn] = useState(false);;

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const onSignUpConfirm = () => {
    setOpenSignUp(false);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const onSignUpClose = () => {
    setOpenSignUp(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const onSignInClose = () => {
    setOpenSignIn(false);
    setName('');
    setEmail('');
    setPassword('');
  };

  const tabs = (
    <Grid item container>
      <Grid item>
        <Button
          variant="text"
          onClick={() => setOpenSignIn(true)}
          style={{
            color: 'white',
            textTransform: 'none',
            marginRight: '1.5em',
          }}
        >
          Đăng nhập
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          onClick={() => setOpenSignUp(true)}
          style={{ color: 'white', textTransform: 'none', marginRight: '1.5em' }}
        >
          Đăng ký
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="text"
          onClick={() => setOpenSignUp(true)}
          style={{ color: 'white', textTransform: 'none' }}
        >
          Trở thành giáo viên
        </Button>
      </Grid>
    </Grid>
  );

// tabs when logged in
const tabsLoggedIn = (
  <Grid item container alignItems='center'>
    <Grid item>
      <Button
        variant="text"
        onClick={() => setOpenSignIn(true)}
        style={{
          color: '#333',
          textTransform: 'none',
          marginRight: '1.5em',
        }}
      >
        Tìm một giáo viên
      </Button>
    </Grid>
    <Grid item>
      <Avatar style={{width: '3em', height: '3em'}}
        src='https://source.unsplash.com/random/200x200'
      >
        Đăng ký
      </Avatar>
    </Grid>
  </Grid>
);

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
              variant="text"
              onClick={() => setOpenSignIn(true)}
              style={{
                color: 'white',
                textTransform: 'none',
              }}
            >
              Đăng nhập
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              onClick={() => setOpenSignUp(true)}
              style={{ color: 'white', textTransform: 'none' }}
            >
              Đăng ký
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="text"
              onClick={() => setOpenSignUp(true)}
              style={{ color: 'white', textTransform: 'none' }}
            >
              Trở thành giáo viên
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
  );

  return (
    <Fragment>
     {userInfo ? <><ElevationScroll>
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
                  onClick={() => props.setValue(0)}
                  className={classes.logoContainer}
                >
                  <img alt="company logo" className={classes.logo} src={logo} />
                </Button>
              </Grid>
              <Grid item>{matches ? drawer : tabsLoggedIn}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      </> : <><ElevationScroll>
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
                  onClick={() => props.setValue(0)}
                  className={classes.logoContainer}
                >
                  <img alt="company logo" className={classes.logo} src={logo} />
                </Button>
              </Grid>
              <Grid item>{matches ? drawer : tabs}</Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      {/* Register Dialog */}
      <Dialog
        open={openSignUp}
        style={{ zIndex: 1302 }}
        onClose={onSignUpClose}
      >
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.closeButton}>
              <IconButton aria-label="close" onClick={onSignUpClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Đăng ký tài khoản
              </Typography>
            </Grid>

            <Grid item>
              <RegisterForm />
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{ margin: '0.7em 0' }}
              >
                <Grid item>
                  <Typography variant="body1">Bạn đã có tài khoản?</Typography>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to="/user/signin"
                    variant="text"
                    style={{
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: '600',
                    }}
                    disableRipple
                  >
                    Đăng nhập
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

      {/* Sign In Dialog */}
      <Dialog
        open={openSignIn}
        style={{ zIndex: 1302 }}
        onClose={onSignInClose}
      >
        <DialogContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item className={classes.closeButton}>
              <IconButton aria-label="close" onClick={onSignInClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Avatar className={classes.avatar}>
                <LockOpenIcon />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h4" gutterBottom>
                Đăng nhập
              </Typography>
            </Grid>

            <Grid item>
              <LoginForm />
              <Grid
                container
                alignItems="center"
                justify="center"
                style={{ margin: '0.7em 0' }}
              >
                <Grid item>
                  <Typography variant="body1">
                    Bạn chưa có tài khoản?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    component={Link}
                    to="/user/signup"
                    variant="text"
                    style={{
                      fontSize: '1rem',
                      textTransform: 'none',
                      fontWeight: '600',
                    }}
                    disableRipple
                  >
                    Đăng ký
                  </Button>
                </Grid>
              </Grid>
              {/* </form> */}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog></> }
      
    </Fragment>
  );
}
