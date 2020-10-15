import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FacebookIcon from '@material-ui/icons/Facebook';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import YouTubeIcon from '@material-ui/icons/YouTube';

const useStyles = makeStyles((theme) => ({
  footerContainer: {
    padding: '1em 10em',
    backgroundColor: '#333',
  },
  MuiTypography: {
    colorPrimary: '#fff',
  },
}));
const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container justify="space-between" className={classes.footerContainer}>
      <Grid item>
        <Grid item container direction="column">
          <Grid item>
            <Typography variant="h5" gutterBottom style={{ color: '#fff' }}>
              Dạy tiếng Anh
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="body1"
              paragraph
              className={classes.footerLink}
            >
              <Link href="#">Trở thành giáo viên</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid item container justify="center">
          <Grid item>
            <IconButton>
              <FacebookIcon
                style={{ fontSize: '2em', color: '#fff', marginRight: '0.5em' }}
              />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton>
              <YouTubeIcon style={{ fontSize: '2em', color: '#fff' }} />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
