import React from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import { Link } from 'react-router-dom'

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
  avatarImg: {
    width: '4em',
    height: '4em',
  },
}))

const Dashboard = () => {
  const classes = useStyles()
  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <div className={classes.toolbarMargin} />
      <Card style={{ maxWidth: '60vw', margin: 'auto' }}>
        <CardContent>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="column"
          >
            <Grid item>
              <p>ID: 123</p>
            </Grid>
            <Grid item>
              <Avatar
                className={classes.avatarImg}
                alt="avatar user"
                src="https://source.unsplash.com/random/300x300"
              />
            </Grid>
            <Grid item>
              <Link>Display Name</Link>
            </Grid>
            <Grid item>Address</Grid>
            <Grid item>English Level</Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard