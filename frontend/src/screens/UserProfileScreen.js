import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import EditProfileDialog from './EditProfileDialog'
import { Route } from 'react-router-dom'

const UserProfileScreen = () => {
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
  }))
  const classes = useStyles()

  const [openEditProfile, setOpenEditProfile] = useState(false)

  const onOpenEditProfile = () => {
    setOpenEditProfile(true)
  }

  const onCloseEditProfile = () => {
    setOpenEditProfile(false)
  }

  return (
    <div style={{ backgroundColor: '#f7f7f7' }}>
      <div className={classes.toolbarMargin} />
      <Grid container spacing={2} justify="center" alignItems="center">
        <Grid item xs={4}>
          <Card>
            <CardContent>
              <Avatar
                src="https://source.unsplash.com/random/100x100"
                style={{ margin: 'auto' }}
              />
              <Typography variant="body1" gutterBottom>
                Name
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            color="primary"
            onClick={onOpenEditProfile}
          >
            Chỉnh sửa profile
          </Button>
        </Grid>
      </Grid>
      <EditProfileDialog
        openEditProfile={openEditProfile}
        onCloseEditProfile={onCloseEditProfile}
      />
    </div>
  )
}
export default UserProfileScreen
