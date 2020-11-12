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
import { useDispatch, useSelector } from 'react-redux'
import Chip from '@material-ui/core/Chip'

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

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

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
              <Grid
                container
                justify="center"
                alignItems="center"
                direction="column"
              >
                <Chip label={`${user._id}.slice(0, 5)}`} />
                <Grid item>
                  <Avatar src={user.imageAvatar} style={{ margin: 'auto' }} />
                </Grid>
              </Grid>
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
